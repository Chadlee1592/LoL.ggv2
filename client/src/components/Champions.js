import React, { Component } from "react";
import { Col, Row, Pagination } from "antd";
import champions from "./../champions.json";
import ChampionCard from "./ChampionCard";

class Champions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 12
    };
  }
  onChange = (page, pageSize) => {
    this.setState({
      page: page,
      pageSize: pageSize
    });
  };

  render() {
    const champArray = champions.slice(
      (this.state.page - 1) * this.state.pageSize,
      this.state.page * this.state.pageSize
    );
    console.log(champArray);
    return (
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Row type="flex" justify="space-between">
          {champArray.map(champion => {
            return (
              <Col span={12} xxl={8}>
                <ChampionCard
                  name={champion.championName}
                  image={champion.imageUrl}
                  role={champion.roles}
                  skins={champion.skinsUrls}
                />
              </Col>
            );
          })}
        </Row>
        <Pagination
          pageSize={12}
          onChange={(page, pageSize) => this.onChange(page, pageSize)}
          defaultCurrent={1}
          total={143}
        />
      </div>
    );
  }
}

export default Champions;
