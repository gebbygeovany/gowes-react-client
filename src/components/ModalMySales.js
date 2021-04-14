import React, { useState, useContext } from "react";
import {
  Button,
  Divider,
  Grid,
  Modal,
  List,
  Confirm,
  Form,
  Header,
  Icon
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";

import ItemMyOrders from "./ItemMyOrders";
import { AuthContext } from "../context/auth";
import { UPDATE_ORDER, ADD_AWB_NUMBER } from "../util/graphql";
import { useForm } from "../util/hooks"


function ModalMySales({ order }) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({})
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [stateType, setStateType] = useState("");
  const [editState, setEditState] = useState(false);

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


  function confirmOrder() {
    setStateType("PROCESSED")
    setEditState(true)
  }
  function cancelConfirmOrder() {
    setEditState(false)
    setConfirmOpen(false)
  }

  function rejectOrder() {
    setStateType("FAILED")
    setEditState(true)
  }
  function cancelRejectOrder() {
    setEditState(false)
    setRejectOpen(false)
  }

  function sendOrder() {
    setStateType("DELIVERY")
    setEditState(true)
  }

  if (editState) {
    changeState()
  }

  const { onChange, onSubmit, values } = useForm(addAwbNumberCallback, {
    awbNumber: ""
  })

  const [addAwbNumber] = useMutation(ADD_AWB_NUMBER, {
    update(_, { data: { addAwbNumber: data } }) {
      sendOrder()
      setOpenModal(false)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      orderId: orderId,
      awbNumber: values.awbNumber,
      courierName: order.shipping.courierName,
      buyerAddress: order.shipping.buyerAddress,
      shippingCost: order.shipping.shippingCost
    }
  })

  function addAwbNumberCallback() {
    addAwbNumber()
  }

  var AWBInput = (
    <Form style={{ padding: 30 }} onSubmit={onSubmit}>
      <Form.Field>
        <Form.Input
          fluid
          label="AWB Number"
          icon='shipping'
          iconPosition='left'
          placeholder='AWB Number'
          name="awbNumber"
          value={values.awbNumber}
          onChange={onChange}
        />
      </Form.Field>
      <Button floated="right" style={{ marginBottom: 30 }}>Submit</Button>
    </Form>
  );

  var orderAction;

  if (order.state.stateType === "CONFIRMATION") {
    orderAction = (
      <Modal.Actions>
        <Button
          color="red"
          animated
          onClick={() => setRejectOpen(true)}
          style={{ width: 200 }}
        >
          <Button.Content visible>Reject Order?</Button.Content>
          <Button.Content hidden>Reject</Button.Content>
        </Button>
        <Confirm
          open={rejectOpen}
          onCancel={cancelRejectOrder}
          onConfirm={rejectOrder}
          cancelButton="Cancel"
          confirmButton="Confirm"
        // closeIcon={onClick=() => setConfirmOpen(false)}
        />
        <Button
          color="teal"
          animated
          onClick={() => setConfirmOpen(true)}
          style={{ width: 200 }}
        >
          <Button.Content visible>Confirm Order?</Button.Content>
          <Button.Content hidden>Confirm</Button.Content>
        </Button>
        <Confirm
          open={confirmOpen}
          onCancel={cancelConfirmOrder}
          onConfirm={confirmOrder}
          cancelButton="Cancel"
          confirmButton="Confirm"
        // closeIcon={onClick=() => setConfirmOpen(false)}
        />
      </Modal.Actions>
    );
  } else if (order.state.stateType === "PROCESSED") {
    orderAction = (
      // <Modal.Actions>

      //   <Confirm
      //     open={confirmOpen}
      //     onCancel={() => setConfirmOpen(false)}
      //     onConfirm={() => setOpen(false)}
      //     cancelButton="Cancel"
      //     confirmButton="Confirm"
      //     content={AWBInput}
      //   />
      // </Modal.Actions>
      <Modal
        closeIcon
        open={openModal}
        trigger={
          <Button
            color="teal"
            animated
            style={{ width: 200, margin: 10, marginRight: 30 }}
            floated="right"
          >
            <Button.Content visible>Send Item</Button.Content>
            <Button.Content hidden>Send item now !</Button.Content>
          </Button>
        }
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
      >
        <Modal.Content>
          {AWBInput}
        </Modal.Content>
      </Modal>
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
              <h5 style={{ marginTop: 5, marginBottom: 10, color: "teal" }}>
                INV/20210302/XXI/III/767167447
              </h5>
              <div>Status</div>
              <h5 style={{ marginTop: 5, marginBottom: 10 }}>{order.state.stateType}</h5>
              <div>Store Name</div>
              <h5 style={{ marginTop: 5, marginBottom: 10, color: "teal" }}>
                Jon's Store
              </h5>
              <div>Order Date</div>
              <h5 style={{ marginTop: 5, marginBottom: 10 }}>
                2 Mar 2021, 09:22 WIB
              </h5>
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
              <>
                <ItemMyOrders item={item} />
                <Divider />
              </>
            ))}
        </Modal.Description>


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
                Muhammad Gebby Geovany
              </h5>
              <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                komplek pasanggrahan indah blok 17 no.8
              </div>
              <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                Ujung Berung
              </div>
              <div style={{ paddingLeft: 10, marginBottom: 0 }}>
                Kota Bandung
              </div>
              <div style={{ paddingLeft: 10, marginBottom: 0 }}>40617</div>
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
                SiCepat - Regular Package
              </h5>
              {order.state.stateType === "DELIVERY" || "ARRIVED" ? (
                <div style={{ paddingLeft: 10, marginBottom: 10 }}>
                  AWB num : {order.shipping.awbNumber}
                </div>
              ) : (
                <></>
              )}
              <Button style={{ margin: 10 }} compact color="purple">
                Chat Seller
              </Button>
            </Grid.Column>
          </Grid>
        </Modal.Description>

        <Divider />

        <Modal.Description>
          <h5 width={8} style={{ paddingLeft: 10, margin: 0 }}>
            Payment
          </h5>
          <List
            divided
            verticalAlign="middle"
            style={{ paddingLeft: 10, paddingRight: 10 }}
          >
            <List.Item>
              <List.Content floated="right">Rp100.000</List.Content>
              <List.Content style={{ marginBottom: 5 }}>Item (x2)</List.Content>
              <List.Content floated="right">Rp10.000</List.Content>
              <List.Content style={{ marginBottom: 5 }}>
                Shipping Cost
              </List.Content>
              <List.Content
                floated="right"
                style={{ color: "teal", fontWeight: 1000 }}
              >
                Rp110.000
              </List.Content>
              <List.Content style={{ marginBottom: 5 }}>
                Total Payment
              </List.Content>
              <List.Content floated="right">BCA Virtual Account</List.Content>
              <List.Content style={{ marginBottom: 5 }}>
                Total Payment
              </List.Content>
            </List.Item>
          </List>
        </Modal.Description>
        <br></br>
      </Modal.Content>
      {orderAction}
    </Modal>
  );
}

export default ModalMySales;
