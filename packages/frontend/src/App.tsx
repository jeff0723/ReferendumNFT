import React, { useState } from 'react';
import "antd/dist/antd.css";
import { Layout, Typography, Button, Modal } from 'antd'
import Chains from './components/Chains'
import Account from './components/Account'
<<<<<<< HEAD
import { useActiveWeb3React } from './hooks/web3';
=======
>>>>>>> 39302bd24444ca16ff4c4bc77f034744dc925dfd
import "./style.css";
const { Header, Content, Footer } = Layout;
const { Text } = Typography
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: "#ffffff"
  },
}
function App() {
<<<<<<< HEAD
  const { chainId } = useActiveWeb3React();
  console.log("App: ", chainId)
=======
>>>>>>> 39302bd24444ca16ff4c4bc77f034744dc925dfd
  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Header style={styles.header}>
        <div>
          <Text style={{ color: '#1890ff', fontSize: '16px', fontWeight: 'bold' }}>Referendum</Text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Chains />
          <Account />

        </div>
      </Header>
      <Content>

      </Content>
      <Footer>

      </Footer>
    </Layout>
  );
}

export default App;
