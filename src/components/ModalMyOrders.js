import React, { useState } from "react";
import { Button, Divider, Grid, Modal, List, Confirm } from "semantic-ui-react";
import ItemMyOrders from "./ItemMyOrders";

function ModalMyOrders({ order }) {
  const [open, setOpen] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  //   let store = "6016b07f469523044467af34";

  //   var AWBInput = (
  //     <Form style={{ padding: 30 }}>
  //       <Form.Field>
  //         <label>AWB Number</label>
  //         <input placeholder="AWB Number" />
  //       </Form.Field>
  //     </Form>
  //   );

  var orderAction;

  console.log(order);

  if (order.state.stateType === "Order shipped") {
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
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => setOpen(false)}
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
              <h5 style={{ marginTop: 5, marginBottom: 10, color: "teal" }}>
                INV/{order.id}
              </h5>
              <div>Status</div>
              <h5 style={{ marginTop: 5, marginBottom: 10 }}>{order.state.stateType}</h5>
              <div>Store Name</div>
              <h5 style={{ marginTop: 5, marginBottom: 10, color: "teal" }}>
                {order.seller.username}
              </h5>
              <div>Order Date</div>
              <h5 style={{ marginTop: 5, marginBottom: 10 }}>
                {order.state.createdAt}
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
              <ItemMyOrders item={item} />
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
                  AWB num : 000444958166
                </div>
              ) : (
                <></>
              )}
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

export default ModalMyOrders;
