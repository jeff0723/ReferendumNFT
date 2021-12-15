import React, { useState } from 'react';
import "antd/dist/antd.css";
import { Layout, Typography, Button, Modal } from 'antd'
import Chains from './components/Chains'
import Account from './components/Account'
import { useActiveWeb3React } from './hooks/web3';
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
  const { chainId } = useActiveWeb3React();
  console.log("App: ", chainId)
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
