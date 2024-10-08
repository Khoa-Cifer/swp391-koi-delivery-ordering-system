import "./MainContent.scss";
import { Button, Card, Flex, Typography } from "antd";

const SalesFishDetail = () => {
  const cardStyle = {
    width: 300,
  };
  return (
    <div className="main-content">
      {/* Slider Section */}
      <div className="slider-container">
        <div className="slider-fish-img">
          <h4>Slider Fish Img</h4>
        </div>
      </div>

      <div className="card-container">
        <Card
          hoverable
          style={cardStyle}
          styles={{
            body: {
              padding: 0,
              overflow: "hidden",
            },
          }}
        >
          <Flex
            vertical
            align="flex-end"
            justify="space-around"
            style={{
              padding: 32,
            }}
          >
            <Typography.Title
              level={5}
              style={{ width: "100%" }}
              ellipsis={{ rows: 4 }}
            >
              antd is an enterprise-class UI design language and React UI
              library. antd is an enterprise-class UI design language and React
              UI library.
            </Typography.Title>
            <Button type="primary" href="https://ant.design" target="_blank">
              View Detail
            </Button>
          </Flex>
        </Card>
        <Card
          hoverable
          style={cardStyle}
          styles={{
            body: {
              padding: 0,
              overflow: "hidden",
            },
          }}
        >
          <Flex
            vertical
            align="flex-end"
            justify="space-around"
            style={{
              padding: 32,
            }}
          >
            <Typography.Title
              level={5}
              style={{ width: "100%" }}
              ellipsis={{ rows: 4 }}
            >
              antd is an enterprise-class UI design language and React UI
              library. antd is an enterprise-class UI design language and React
              UI library.
            </Typography.Title>
            <Button type="primary" href="https://ant.design" target="_blank">
              View Detail
            </Button>
          </Flex>
        </Card>
        <Card
          hoverable
          style={cardStyle}
          styles={{
            body: {
              padding: 0,
              overflow: "hidden",
            },
          }}
        >
          <Flex
            vertical
            align="flex-end"
            justify="space-around"
            style={{
              padding: 32,
            }}
          >
            <Typography.Title
              level={5}
              style={{ width: "100%" }}
              ellipsis={{ rows: 4 }}
            >
              antd is an enterprise-class UI design language and React UI
              library. antd is an enterprise-class UI design language and React
              UI library.
            </Typography.Title>
            <Button type="primary" href="https://ant.design" target="_blank">
              View Detail
            </Button>
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default SalesFishDetail;
