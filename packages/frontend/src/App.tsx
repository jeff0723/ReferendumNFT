import { LoadingOutlined, PlusOutlined, MenuOutlined, FacebookFilled, InstagramFilled, TwitterSquareFilled } from '@ant-design/icons';
import { Card, Form, Input, Layout, Typography, Button, Checkbox, Tooltip, Col, Row, Divider, Drawer, Spin, Result } from 'antd';
import "antd/dist/antd.css";
import { create } from 'ipfs-http-client';
import React, { useEffect, useState } from 'react';
import Account from './components/Account';
import Chains from './components/Chains';
import { useActiveWeb3React } from './hooks/web3';
import { useMediaQuery } from 'react-responsive'
import { useReferendumContract } from './hooks/useContract'
import metadataTemplate from './metadata-template.json'
import { FacebookShareButton, TwitterShareButton, InstapaperShareButton } from "react-share";
import "./style.css";
import { BigNumber, ethers, Wallet } from 'ethers';
import { removeAllListeners } from 'process';

enum ImageStatus {
  NotUpload,
  Uploading,
  Uploaded
}

enum PageStatus {
  Edit,
  Uploading,
  Finished
}
const FEE_PAYER_KEY = process.env.REACT_APP_FEE_PAYER;
const { Header, Content, Footer } = Layout;
const { Text } = Typography
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: "linear-gradient(270deg, #eef8fa 0%, rgba(24,178,255,1)  100%)",
    color: '#ffffff',
    // border: "1px solid #e7eaf3"
  },
  contentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "50%",
    minWidth: '375px'
  },
  title: {
    color: '#40a9ff',
    fontWeight: 'bold'
  },
  subtitle: {
    color: '#bfbfbf'
  }
}

const addImageOptions = {
  pin: true,
  enableShardingExperiment: true,
}
const client = create({ url: 'https://ipfs.infura.io:5001/api/v0' })

function App() {
  const { chainId, account } = useActiveWeb3React();
  const [form] = Form.useForm();
  const [imageURI, setImageURI] = useState<string>("");
  const [previewURL, setPreviewURL] = useState<string>("")
  const [imageStatus, setImageStatus] = useState(ImageStatus.NotUpload);
  const [mintStatus, setMintStatus] = useState(PageStatus.Edit);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [feePayerBalance, setFeePayerBalance] = useState<string>("");
  const referendumContract = useReferendumContract();
  useEffect(() => {
    const fetchFeePayerBalance = async () => {
      if (referendumContract && FEE_PAYER_KEY) {
        const feePayer = new Wallet(FEE_PAYER_KEY, referendumContract.provider);
        const balance = await referendumContract.provider.getBalance(feePayer.address);
        setFeePayerBalance(ethers.utils.formatEther(balance));
      }
    }
    fetchFeePayerBalance();
  }, [referendumContract]);
  console.log(feePayerBalance)
  const isDesktop = useMediaQuery({
    query: '(min-width: 576px)'
  })
  const isTablet = useMediaQuery({
    query: '(min-width: 992px)'
  })
  console.log("App: ", chainId)
  console.log("Desktop: ", isDesktop)
  const uploadButton = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {imageStatus === ImageStatus.Uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上傳圖片</div>
    </div>
  );
  const handleUploadChange = async (e: any) => {
    console.log("any: ", e.target.files[0]);
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
  const handleFinish = async (values: any) => {
    if (!account || !referendumContract) {
      console.log("account:", account);
      console.log("contract:", referendumContract);
      return;
    }
    console.log("Success: ", values);
    let template = metadataTemplate;
    const isGasFree = values.gasfree;
    console.log("start to submit");
    template.name = values.name;
    template.description = values.description;
    template.image = imageURI;
    setMintStatus(PageStatus.Uploading);
    const cid = await client.add(JSON.stringify(template), addImageOptions)
      .then(response => {
        if (isGasFree && FEE_PAYER_KEY) {
          const feePayer = new Wallet(FEE_PAYER_KEY, referendumContract.provider);
          referendumContract.connect(feePayer).mintTo(response.cid.toString(), account);
        }
        else if (!isGasFree) {
          referendumContract.mint(response.cid.toString());
        }
        else {
          console.log("fee payer", FEE_PAYER_KEY);
        }
        return response.cid.toString();
      }).finally(() => {
        setMintStatus(PageStatus.Finished);
      })
    console.log("cid: ", cid);
  }
  console.log("imageURI: ", imageURI)
  return (
    <Layout style={{ backgroundColor: "#ffffff" }}>
      <Header style={{ ...styles.header, position: 'fixed', zIndex: 1, width: '100%' }}>
        <div>
          <Text style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold' }}>Referendum</Text>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          {isTablet ?
            <>
              <Chains />
              <Account />
            </> :
            <div onClick={() => { setDrawerOpen(true) }}>
              <MenuOutlined style={{ color: '#40a9ff' }} />
            </div>
          }

        </div>
        <Drawer
          title="設定"
          closable={true}
          placement='left'
          onClose={() => { setDrawerOpen(false) }}
          visible={drawerOpen}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <Text>網路</Text>
              <Chains />
            </div>
            <div>
              <Text>帳號</Text>
              <Account />
            </div>
          </div>
        </Drawer>
      </Header>
      <Content style={{ minHeight: 'calc(100vh - 48px)', marginBottom: (!isTablet ? "32px" : '0px') }}>
        <Row style={{ minHeight: 'calc(100vh - 48px)' }}>
          <Col span={24} lg={12} >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', minHeight: '60vh' }}>
              <div>
                <Text style={{ ...styles.title, fontSize: (isDesktop ? "48px" : '32px') }}>紀念你的重要時刻</Text>
              </div>
              <div>
                <Text style={{ ...styles.subtitle, fontSize: (isDesktop ? "16px" : '12px') }}>#Vote For NFT</Text>
                <Text style={{ ...styles.subtitle, marginLeft: "5px", fontSize: (isDesktop ? "16px" : '12px') }}>#Democracy Token</Text>
              </div>

            </div>
          </Col>
          {!isTablet ? <Divider style={{ marginBottom: '32px' }} /> : <></>}
          <Col span={24} lg={12}>
            <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Card
                style={{
                  borderRadius: '16px',
                  padding: '16px',
                  width: '50%',
                  minWidth: '330px',
                  boxShadow: (isTablet ? "0 1px 10px rgb(151 164 175 / 30%)" : ""),
                  border: (!isTablet ? "none" : "")
                }}>
                {mintStatus !== PageStatus.Finished ?
                  <Spin spinning={mintStatus === PageStatus.Uploading} tip='鑄造中...'>
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
                        <Checkbox value={true}>免Gas Fee鑄造</Checkbox>
                        {/* <Tooltip title='支付gas fee的使用者將會多拿到一顆的民主精神代幣'>
                      </Tooltip> */}
                      </Form.Item>
                      <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                        <Button type="primary" htmlType="submit" style={{ borderRadius: '16px', width: '100%' }}>
                          鑄造
                        </Button>
                      </div>
                    </Form>
                  </Spin> :
                  <div>
                    <Result
                      status="success"
                      title="你已經成功鑄造您的公投NFT!"
                      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                      extra={[
                        <FacebookShareButton
                          url={"https://codesandbox.io/s/rrlli?file=/src/App.js:253-557"}
                          quote={"我已成功創建公投NFT(Referendum NFT #1244"}
                          hashtag={"#VoteForNFT"}
                        >
                          <FacebookFilled style={{ color: '#4267B2' }} /> 分享到Facebook
                        </FacebookShareButton>,
                        <TwitterShareButton
                          url={"https://codesandbox.io/s/rrlli?file=/src/App.js:253-557"}
                          title={"我已成功創建公投NFT(Referendum NFT #1244"}
                          hashtags={["VoteForNFT", "DemocracyToken"]}>
                          <TwitterSquareFilled style={{ color: '#00acee' }} /> 分享到Twitter
                        </TwitterShareButton>,
                      ]}
                    />
                  </div>
                }
              </Card>
            </div >
          </Col >
        </Row >

      </Content >
      <Footer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Text>Powered by © RebirthLab</Text>
        </div>
      </Footer>
    </Layout >
  );
}

export default App;
