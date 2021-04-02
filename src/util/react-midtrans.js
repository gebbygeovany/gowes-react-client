import { cloneElement, PureComponent } from "react";
import PropTypes from "prop-types";
import { client } from "../ApolloProvider";
import { CREATE_PAYMENT_QUERY, UPDATE_ORDER } from "../util/graphql";
import { connect } from "react-redux";
import { setOrderIdsWillBePayed } from "../actions/orderAction";
const { oneOfType, arrayOf, node, func, string } = PropTypes;

class SnapMidtrans extends PureComponent {
  state = {
    children: null,
    token: "",
    paymentInput: {},
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.token !== prevState.token
      ? { token: nextProps.token, paymentInput: nextProps.paymentInput }
      : null;
  }

  constructor(props) {
    super(props);
    const { NODE_ENV: ENV } = process.env;
    // bind react-midtrans method
    this.mergeWithChildren = this.mergeWithChildren.bind(this);
    // backup currentview
    this.currentViewport = document
      .getElementsByTagName("meta")
      .hasOwnProperty("viewport")
      ? document.getElementsByTagName("meta").viewport
      : "";
    // create element for script
    this.snapScript = document.createElement("script");

    // checking environment mode
    this.snapScript.src =
      ENV === "production"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";

    this.snapScript.type = "text/javascript";
    this.snapScript.onload = this.onLoad.bind(this);
    this.snapScript.dataset.clientKey = props.clientKey;
  }

  onLoad(e) {
    if ("snap" in window) {
      const { snap } = window;
      this.setState({ snap });
    }
  }

  componentDidMount() {
    document.head.appendChild(this.snapScript);
    this.mergeWithChildren(this.props.children);
  }

  mergeWithChildren(children) {
    children = cloneElement(
      children,
      // Assign new Props
      {
        onClick: () => {
          // If Children have a onClick
          children.onClick && children.onClick();
          if (this.state.token && this.state.token !== "") {
            client
              .query({
                query: CREATE_PAYMENT_QUERY,
                variables: { createPaymentInput: this.state.paymentInput },
                onError(err) {
                  console.log(err.graphQLErrors[0].extensions.exception.errors);
                },
              })
              .then((result) => {
                this.state.snap.pay(result.data.createPayment.token, {
                  onSuccess: (result) => {
                    console.log("payment success!", result);
                    console.log(
                      "OrderIds that should be updated!",
                      this.props.orderIds
                    );
                    this.props.orderIds.forEach((orderId) => {
                      client.mutate({
                        mutation: UPDATE_ORDER,
                        variables: {
                          orderId: orderId,
                          state: "PROCESSED",
                        },
                      }).then((result) => {console.log("succedded updateOrder result:", result)});
                    });
                  },
                  onPending: (result) => {
                    console.log("wating your payment!", result);
                  },
                  onError: (result) => {
                    console.log("payment failed!", result);
                  },
                  onClose: () => {
                    console.log(
                      "you closed the popup without finishing the payment"
                    );
                  },
                });
              });
          }
          this.props.onClick && this.props.onClick();
        },
      }
    );
    this.setState({
      children,
    });
  }

  render() {
    return this.state.children;
  }
}
const mapStateToProps = (state) => ({
  orderIds: state.orders.orderIds,
});

export default connect(mapStateToProps, { setOrderIdsWillBePayed })(
  SnapMidtrans
);
/**
 * @module SnapMidtrans
 * @param {Object} props
 * @property {ReactElement} children - required
 * @property {String} token
 * @todo 4 callback
 * @property {Function} onSuccess
 * @property {Function} onError
 * @property {Function} onPending
 * @property {Function} onClose
 */
SnapMidtrans.propTypes = {
  orderIds: PropTypes.array,
  children: oneOfType([arrayOf(node), node]).isRequired,
  clientKey: string.isRequired,
  token: string,
  setOrderIdsWillBePayed: func,

  /* @see @link {https://snap-docs.midtrans.com/#snap-js|Midtrans API 4 Callback} */
  onSuccess: func,
  onPending: func,
  onError: func,
  onClose: func,

  /* Callback Or Custom onClick */
  onClick: func,
};
