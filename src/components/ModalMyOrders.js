import React, { useState } from "react";
import { Button, Divider, Grid, Modal, List, Confirm } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import Time from 'react-time-format'


import ItemMyOrders from "./ItemMyOrders";
import { UPDATE_ORDER } from "../util/graphql";



function ModalMyOrders({ order }) {

  const [errors, setErrors] = useState({})
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [stateType, setStateType] = useState("");
  const [editState, setEditState] = useState(false);
  const answer_array = order.state.createdAt.split('T');


  const orderId = order.id

  const [changeState, { loading }] = useMutation(UPDATE_ORDER, {
    update(_, { data: { updateOrder: orderData } }) {
      setEditState(false)
      setConfirmOpen(false)
      setRejectOpen(false)
      setOpen(false)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { orderId: orderId, state: stateType }
  })


  function confirmArrivalOrder() {
    setStateType("ARRIVED")
    setEditState(true)
  }
  function cancelConfirmArrivalOrder() {
    setEditState(false)
    setConfirmOpen(false)
  }

  if (editState) {
    changeState()
  }



  var orderAction;


  if (order.state.stateType === "DELIVERY") {
    orderAction = (
      <Modal.Actions>
        <Button
          color="teal"
          animated
          onClick={() => setConfirmOpen(true)}
          style={{ width: 200 }}
        >
          <Button.Content visible>Order Arrived?</Button.Content>
          <Button.Content hidden>Arrival Confirmation</Button.Content>
        </Button>
        <Confirm
          open={confirmOpen}
          onCancel={cancelConfirmArrivalOrder}
          onConfirm={confirmArrivalOrder}
          cancelButton="Cancel"
          confirmButton="Confirm"
        />
      </Modal.Actions>
    );
  } else if (order.state.stateType === "Waiting for payment") {
    orderAction = (
      <Modal.Actions>
        <Button
          color="teal"
          animated
          onClick={() => setConfirmOpen(true)}
          style={{ width: 200 }}
        >
          <Button.Content visible>Cancel Order?</Button.Content>
          <Button.Content hidden>Cancel Order</Button.Content>
        </Button>
        <Confirm
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => setOpen(false)}
          cancelButton="Cancel"
          confirmButton="Confirm"
        />
      </Modal.Actions>
    );
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <Button floated="right" size="small" color="teal">
          See Orders
        </Button>
      }
      style={{ marginTop: 100 }}
      size="small"
      closeIcon
    >
      <Modal.Content scrolling>
        <Modal.Description>
          <Grid stackable>
            <Grid.Column width={16} textAlign="center">
              <h4>Order Details</h4>
            </Grid.Column>
            <Grid.Column width={16} textAlign="center"></Grid.Column>
            <Grid.Column width={12} style={{ paddingTop: 10, paddingLeft: 20 }}>
              <div>Invoice Number</div>
              <h5
                as={Link}
                to={`/invoice`}
                style={{ marginTop: 5, marginBottom: 10, color: "teal" }}
              >
                INV/{order.id}
              </h5>
              <div >Status</div>
              <h5 style={{ marginTop: 5, marginBottom: 10 }}>{order.state.stateType}</h5>
              <div>Store Name</div>
              <h5 style={{ marginTop: 5, marginBottom: 10, color: "teal" }}>
                {order.seller.username}
              </h5>
              <div>Order Date</div>
              <h5 style={{ marginTop: 5, marginBottom: 10 }}>
                <Time value={answer_array[0]} format="DD-MM-YYYY" />
              </h5>
            </Grid.Column>
            <Grid.Column width={4} style={{ paddingTop: 10 }}>
              <Button.Group
                vertical
                floated="right"
                style={{ paddingRight: 10 }}
              >
                {order.state.stateType === "Order arrived" ? (
                  <Button fluid color="purple" compact>
                    Give Review
                  </Button>
                ) : (
                  <></>
                )}
                <Button fluid compact>
                  Chat Seller
                </Button>
                <Button fluid compact
                  as={Link}
                  to={`/invoice`}
                  color="teal"
                >
                  See Invoice
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Modal.Description>

        <Divider />

        <Modal.Description>
          <h5 width={8} style={{ paddingLeft: 10, margin: 0 }}>
            Item list
          </h5>
          {order.items &&
            order.items.map((item) => (
              <ItemMyOrders item={item} order={order} />
            ))}
        </Modal.Description>

        <Divider />

        <Modal.Description>
          <Grid stackable>
            <Grid.Column width={10}>
              <h5 width={8} style={{ paddingLeft: 10, marginBottom: 10 }}>
                Address
              </h5>
              <h5
                style={{
                  paddingLeft: 10,
                  marginTop: 5,
                  marginBottom: 3,
                  color: "teal",
                }}
              >
                {order.user.buyer.name}
              </h5>
              <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                {order.shipping.buyerAddress}
              </div>
              {/* <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                Ujung Berung
              </div>
              <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                Kota Bandung
              </div>
              <div style={{ paddingLeft: 10, marginBottom: 0 }}>40617</div> */}
            </Grid.Column>
            <Grid.Column width={6}>
              <h5 width={8} style={{ paddingLeft: 10, marginBottom: 10 }}>
                Shipping Info
              </h5>
              <h5
                style={{
                  paddingLeft: 10,
                  marginTop: 5,
                  marginBottom: 3,
                  color: "teal",
                }}
              >
                {order.shipping.courierName}
              </h5>
              {order.state.stateType === "Order shipped" ? (
                <div style={{ paddingLeft: 10, marginBottom: 10 }}>
                  AWB num : {order.shipping.awbNumber}
                </div>
              ) : (
                <></>
              )}
            </Grid.Column>
          </Grid>
        </Modal.Description>

        <br></br>
      </Modal.Content>
      {orderAction}
    </Modal>
  );
}

export default ModalMyOrders;
