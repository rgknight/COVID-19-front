import React from "react";
import _ from "lodash";
import moment from "moment";
import { Container, Header, Grid } from "semantic-ui-react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryLine,
  VictoryTooltip
} from "victory";

const Target =
  "https://raw.githubusercontent.com/rgknight/COVID-19-MA-County/master/data/covid-19-ma-county.json";

const sliceData = data => {
  return _.slice(data, -16);
};

const countyCharts = data => {
  return (
    <VictoryChart>
      <VictoryAxis
        style={{
          ticks: { stroke: "grey", size: 5 },
          tickLabels: { fontSize: 20 }
        }}
        tickFormat={tick => moment(tick).format("M/D")}
        fixLabelOverlap
      />
      <VictoryAxis
        dependentAxis
        style={{
          tickLabels: { fontSize: 20 }
        }}
      />
      <VictoryBar
        data={data}
        x="date"
        y="total_cases"
        labels={({ datum }) =>
          moment(datum.date).format("M/D") +
          "\n" +
          datum.total_cases +
          " total\n" +
          datum.new_cases +
          " new"
        }
        labelComponent={
          <VictoryTooltip
            flyoutStyle={{
              fill: "none",
              fontSize: 20
            }}
          />
        }
        style={{ data: { fill: "grey" } }}
      />
      <VictoryLine
        data={data}
        x="date"
        y="new_cases"
        style={{ data: { stroke: "blue", strokeWidth: 5 } }}
      />
    </VictoryChart>
  );
};

class CovidCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counties: []
    };
  }

  componentDidMount() {
    fetch(Target)
      .then(results => results.json())
      .then(data => {
        console.log(typeof data);
        console.log(data);
        this.setState({ counties: data.counties });
      });
  }

  render() {
    const counties = this.state.counties;
    return (
      <Container>
        <Header as="h1">
          Reported COVID-19 Cases in Massachusetts by County
        </Header>
        <Header as="h1" style={{ color: "blue" }}>
          New Cases
        </Header>
        <Header as="h1" style={{ color: "grey", marginBottom: "2rem" }}>
          Total Cases
        </Header>
        <Grid columns="3">
          <>
            {counties.map(c => {
              return (
                <>
                  <Grid.Column width="5" key={"g" + c.county}>
                    <Header as="h2" key={"h" + c.county}>
                      {c.county}
                    </Header>
                    {countyCharts(sliceData(c.data))}
                  </Grid.Column>
                </>
              );
            })}
          </>
        </Grid>
      </Container>
    );
  }
}

export default CovidCharts;
