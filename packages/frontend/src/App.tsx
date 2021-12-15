import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Form, Input, Layout, Typography, Button, Checkbox, Tooltip } from 'antd';
import "antd/dist/antd.css";
import { create } from 'ipfs-http-client';
import React, { useState } from 'react';
import Account from './components/Account';
import Chains from './components/Chains';
import { useActiveWeb3React } from './hooks/web3';
import "./style.css";
enum ImageStatus {
  NotUpload,
  Uploading,
  Uploaded
}
const { Header, Content, Footer } = Layout;
const { Text } = Typography
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: "#ffffff",
    border: "1px solid #e7eaf3"
  },
  contentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: "100%",
    width: "50%",
    minWidth: '375px'
  },
  title: {
    fontSize: '48px',
    color: '#40a9ff',
    fontWeight: 'bold'
  },
  subtitle: {
    fontSize: '16px',
    color: '#bfbfbf'
  }
}
const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' })

function App() {
  const { chainId } = useActiveWeb3React();
  const [form] = Form.useForm();
  const [imageURI, setImageURI] = useState<string>("");
  const [previewURL, setPreviewURL] = useState<string>("")
  const [imageStatus, setImageStatus] = useState(ImageStatus.NotUpload);
  console.log("App: ", chainId)
  const uploadButton = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {imageStatus === ImageStatus.Uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上傳圖片</div>
    </div>
  );
  const handleUploadChange = async (e: any) => {
    console.log("any: ", e.target.files[0]);
    const addImageOptions = {
      pin: true,
      enableShardingExperiment: true,
    }
    setImageStatus(ImageStatus.Uploading)
    const cid = await client.add(e.target.files[0], addImageOptions)
      .then(response => {
        setImageStatus(ImageStatus.Uploaded)
        setPreviewURL(URL.createObjectURL(e.target.files[0]))
        setImageURI(`ipfs://${response.cid.toString()}`)
        return response.cid.toString()
      })
    console.log("CID: ", cid);

  }
  const handleFinish = (values: any) => {
    console.log("Success: ", values)
    console.log('form: ', form)
  }
  console.log("imageURI: ", imageURI)
  return (
    <Layout style={{ height: "100vh", backgroundColor: "#ffffff" }}>
      <Header style={{ ...styles.header, position: 'fixed', zIndex: 1, width: '100%' }}>
        <div>
          <Text style={{ color: '#1890ff', fontSize: '16px', fontWeight: 'bold' }}>Referendum</Text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <Chains />
          <Account />

        </div>
      </Header>
      <Content style={{ display: 'flex', flexDirection: 'row', marginTop: '32px', padding: '16px', flexWrap: 'wrap' }}>
        <div style={styles.contentBox}>
          <div>
            <Text style={styles.title}>紀念你的重要時刻</Text>
            <br />
            <Text style={styles.subtitle}>#Vote For NFT</Text>
            <Text style={{ ...styles.subtitle, marginLeft: "5px" }}>#Democracy Token</Text>

          </div>
        </div>
        <div style={styles.contentBox}>
          <Card
            // title={<Text>創建公投NFT</Text>}
            style={{
              borderRadius: '16px',
              padding: '16px',
              width: '50%',
              minWidth: '375px'
            }}>
            <Form
              form={form}
              layout="vertical"
              size={'large'}
              onFinish={handleFinish}
            >
              <Form.Item name='name' label="名字" required tooltip="為您的專屬時刻起的名字吧">
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item name='description' label="你的心情" required tooltip="紀錄你當下的心情">
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item label="你的時刻" required tooltip="上傳一張照片紀念這個時刻">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <input type="file" id="actual-btn" hidden onChange={handleUploadChange} />
                  <label htmlFor="actual-btn">{imageStatus !== ImageStatus.Uploaded ? uploadButton : <img src={previewURL} alt='preview' height='100%' width="100%" style={{ maxHeight: '200px', maxWidth: '200px' }} />}</label>
                </div>
              </Form.Item>
              <Form.Item name="gasfree" valuePropName="checked" >
                <Tooltip title='支付gas fee的使用者將會多拿到一顆的民主精神代幣'>
                  <Checkbox >免Gas Fee鑄造</Checkbox>
                </Tooltip>
              </Form.Item>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                <Button type="primary" htmlType="submit" style={{ borderRadius: '16px', width: '100%' }}>
                  鑄造
                </Button>
              </div>

            </Form>
          </Card>
        </div>
      </Content>
      <Footer>

      </Footer>
    </Layout >
  );
}

export default App;
