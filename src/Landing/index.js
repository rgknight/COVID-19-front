import React from "react";
import { Container, Header } from "semantic-ui-react";

class CovidCharts extends React.Component {
  state = {
    locations: 
      'One'
    }
  };

  render() {
    const locations = this.state.locations;
    return (
      <Container medium>
        <Header>COVID-19 Cases in Massachusetts by County</Header>
        <h3>{locations}</h3>
      </Container>
    );
  }
}

export default CovidCharts;
