import { Layout, Menu, Breadcrumb, Table, Spin, Alert, Button } from "antd";
import { useEffect, useState } from "react";

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./App.css";
import { getAllStudents } from "./client";
import StudentDrawerForm from "./StudentDrawerForm";

const { Header, Content, Footer, Sider } = Layout;

const { SubMenu } = Menu;

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

function App() {
  const [students, setStudents] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showDrawer, setShowDrawer] = useState(false);

  const fetchStudents = () =>
    getAllStudents()
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        console.log(data);
        setFetching(false);
      });

  useEffect(() => {
    console.log("component is mounted");
    fetchStudents();
  }, []);

  const renderStudents = () => {
    if (fetching) {
      return (
        <Spin tip="Loading...">
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
      );
    }

    return (
      <>
        <StudentDrawerForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
        />
        <Table
          dataSource={students}
          columns={columns}
          rowKey={(student) => student.id}
          title={() => (
            <Button
              type="primary"
              shape="round"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => setShowDrawer(!showDrawer)}
            >
              Add New Student
            </Button>
          )}
        />
      </>
    );
  };

  // if (students.length <= 0) return "<Empty/>";

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(c) => setCollapsed}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Option 2
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Files
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {renderStudents(students)}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Created by Maksat Rysbekov ©2021
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
