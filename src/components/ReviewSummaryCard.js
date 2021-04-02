import React from "react";
import { Grid, Rating, Header, List, Icon, Container } from "semantic-ui-react";
import ProgressBar from "./ProgressBar";

function ReviewSummaryCard({ item }) {
  const rateStars = [
    {
      star: 5,
      amountReviewers: 10,
    },
    {
      star: 4,
      amountReviewers: 5,
    },
    {
      star: 3,
      amountReviewers: 2,
    },
    {
      star: 2,
      amountReviewers: 0,
    },
    {
      star: 1,
      amountReviewers: 0,
    },
  ];

  let totalReviewer = 0;
  rateStars.map((rate) => (totalReviewer += rate.amountReviewers));

  let markup = (
    <Grid>
      <Grid.Column width={8}>
        <Grid>
          <Grid.Row>
            <Container>
              <Header as="h4">ULASAN(145)</Header>
              <p className="cinema">
                Case Xiaomi Poco X3 NFC Nillkin CamShield - Hitam
              </p>
            </Container>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6} style={{ padding: 0, marginTop: 20 }}>
              <List>
                <span style={{ fontSize: 60, fontStyle: "bold" }}>4.9</span>
                <span>/5</span>
                <List.Item>
                  <Rating
                    disabled
                    maxRating={5}
                    defaultRating={4}
                    icon="star"
                    size="large"
                  />
                </List.Item>
                <List.Item>
                  <span style={{}}>(145) Ulasan</span>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3} style={{ paddingRight: 0 }}>
              <List>
                {rateStars.map((rate, index) => (
                  <List.Item key={index}>
                    <Icon style={{ color: "gold" }} name="star" />
                    {` ${rate.star}`}
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
            <Grid.Column width={5} style={{ padding: 0, marginTop: 4 }}>
              <List>
                {rateStars.map((rate, index) => (
                  <List.Item key={index}>
                    <ProgressBar
                      key={index}
                      bgcolor={"#00B5AD"}
                      completed={(rate.amountReviewers / totalReviewer) * 100}
                    />
                    {/* <Progress size="tiny" percent={rate.amountReviewers / totalReviewer * 100} success style={progressStyle}/> */}
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
            <Grid.Column width={2}>
              <List>
                {rateStars.map((rate, index) => (
                  <List.Item key={index}>{rate.amountReviewers}</List.Item>
                ))}
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid.Column>
    </Grid>
  );
  return markup;
}
export default ReviewSummaryCard;
