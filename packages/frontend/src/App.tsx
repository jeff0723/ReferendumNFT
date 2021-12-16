import { LoadingOutlined, PlusOutlined, MenuOutlined, FacebookFilled, TwitterSquareFilled } from '@ant-design/icons';
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
import { FacebookShareButton, TwitterShareButton } from "react-share";
import "./style.css";
import { BigNumber, ContractReceipt, ethers, Wallet } from 'ethers';
import { openNotificationWithIcon } from './helpers/notification'
import { BLOCKEXPLORER_URL } from './constants/blockExplorer'
import { getEllipsisTxt } from './helpers/formatters'
import Countdown from 'react-countdown';

enum ImageStatus {
  NotUpload,
  Uploading,
  Uploaded
}

enum PageStatus {
  Edit,
  Uploading,
  Finished,
  Error
}
// const FEE_PAYER_KEY = process.env.REACT_APP_FEE_PAYER;
const FEE_PAYER_KEY = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
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
  const [feePayer, setFeePayer] = useState<Wallet>();
  const [transactionHash, setTransactionHash] = useState("");
  const [metadataCID, setMetadataCID] = useState("");
  const [feePayerBalance, setFeePayerBalance] = useState<string>("");
  const [tokenId, setTokenId] = useState<BigNumber>();
  const referendumContract = useReferendumContract();
  useEffect(() => {
    if (referendumContract && FEE_PAYER_KEY) {
      setFeePayer(new Wallet(FEE_PAYER_KEY, referendumContract.provider));
    }
  }, [referendumContract]);
  useEffect(() => {
    const fetchFeePayerBalance = async () => {
      if (feePayer) {
        setFeePayerBalance(ethers.utils.formatEther(await feePayer.getBalance()));
      }
    }
    fetchFeePayerBalance();
  }, [feePayer]);

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
    await client.add(e.target.files[0], addImageOptions)
      .then(response => {
        setImageStatus(ImageStatus.Uploaded)
        setPreviewURL(URL.createObjectURL(e.target.files[0]))
        setImageURI(`ipfs://${response.cid.toString()}`)
      })

  }
  const handleReceipt = (receipt: ContractReceipt) => {
    if (receipt.status === 0) {
      openNotificationWithIcon("error", "交易錯誤", "您的交易發生錯誤，請檢查您是否已經鑄造過或是超過指定的鑄造時間")
      setMintStatus(PageStatus.Error);
      return;
    }
    // console.log("receipt:", receipt.events);
    if (receipt.events && receipt.events[0].args) {
      const tokenId = receipt.events[0].args[2];
      setTransactionHash(receipt.transactionHash);
      setTokenId(tokenId);
      console.log("tokenId:", tokenId);
      if (tokenId) {
        setTokenId(tokenId);
      }
      setMintStatus(PageStatus.Finished);
    }
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

    await client.add(JSON.stringify(template), addImageOptions)
      .then(async (response) => {
        setMetadataCID(response.cid.toString());
        try {
          if (isGasFree) {
            if (!feePayer) return;
            const tx = await referendumContract.connect(feePayer).mintTo("ipfs://" + response.cid.toString(), account, { gasPrice: "100000000000" });
            openNotificationWithIcon("success", "交易正在發送中", "您已使用免Gas Fee的方式送出交易，交易正在處理中請您耐心等候。")
            handleReceipt(await tx.wait());
          }
          else {
            const tx = await referendumContract.mint("ipfs://" + response.cid.toString());
            handleReceipt(await tx.wait());
          }
        } catch (err: any) {
          console.log(typeof err.code)
          if (err.code === 4001) {
            openNotificationWithIcon("error", "交易錯誤", "您已拒絕了交易")
          }
          else if ((err.data?.code) && (err.data.code === -32000)) {
            openNotificationWithIcon("error", "交易錯誤", "不好意思，免費的gas fee已經用完")
          }
          else if ((err.data?.code) && (err.code === -32603)) {
            openNotificationWithIcon("error", "交易錯誤", "您的交易發生錯誤，請檢查您是否已經鑄造過或是超過指定的鑄造時間")
          }
          else if ((err.code === "UNPREDICTABLE_GAS_LIMIT")) {
            openNotificationWithIcon("error", "交易錯誤", "您的交易發生錯誤，請檢查您是否已經鑄造過或是超過指定的鑄造時間")
          }
          setMintStatus(PageStatus.Error);
        }
      })
  }
  console.log("imageURI: ", imageURI)
  console.log("Block:", BLOCKEXPLORER_URL)
  return (
    <Layout style={{ backgroundColor: "#ffffff" }}>
      <Header style={{ ...styles.header, position: 'fixed', zIndex: 1, width: '100%' }}>
        <div>
          <Text style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold' }}>Referendum NFT</Text>
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
      <Content style={{ marginTop: '64px', minHeight: 'calc(100vh - 48px)', marginBottom: (!isTablet ? "32px" : '0px') }}>
        <Row style={{ minHeight: 'calc(100vh - 48px)' }}>
          <Col span={24} lg={12} >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', minHeight: 'calc(100vh - 64px)', gap: '6px' }}>
              <div>
                <Text style={{ ...styles.title, fontSize: (isDesktop ? "48px" : '32px') }}>紀念你的重要時刻</Text>
              </div>
              <div>
                <Text style={{ ...styles.subtitle, fontSize: (isDesktop ? "16px" : '12px') }}>#Vote For NFT</Text>
                <Text style={{ ...styles.subtitle, marginLeft: "5px", fontSize: (isDesktop ? "16px" : '12px') }}>#Democracy Token</Text>
              </div>
              <div>
                <span style={{ backgroundColor: "#fff0f6", color: '#ff85c0', padding: '5px', borderRadius: '8px', fontWeight: 500 }}>公投NFT發行量: </span>
                <span style={{ marginLeft: "16px", backgroundColor: "#e6f7ff", color: '#40a9ff', padding: '5px', borderRadius: '8px', fontWeight: 500 }}>民主代幣發行量: </span>

              </div>
            </div>
          </Col>
          {!isTablet ? <Divider style={{ marginBottom: '32px' }} /> : <></>}
          <Col span={24} lg={12}>
            <div style={{ padding: '16px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 48px)' }}>
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
                      <Form.Item name='name' label="名字" required tooltip="為您的專屬時刻起的名字吧" rules={[
                        {
                          required: true,
                          message: '請輸入您的NFT的名字',
                        },
                      ]}>
                        <Input placeholder="input placeholder" />
                      </Form.Item>
                      <Form.Item name='description' label="你的心情" required tooltip="紀錄你當下的心情" rules={[
                        {
                          required: true,
                          message: '請輸入一段話描述您的心情',
                        },
                      ]}>
                        <Input placeholder="input placeholder" />
                      </Form.Item>
                      <Form.Item name='image' label="你的時刻" required tooltip="上傳一張照片紀念這個時刻" rules={[
                        {
                          required: true,
                          message: '請上傳一張照片',
                        },
                      ]}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <input type="file" id="actual-btn" hidden onChange={handleUploadChange} />
                          <label htmlFor="actual-btn">{imageStatus !== ImageStatus.Uploaded ? uploadButton : <img src={previewURL} alt='preview' height='100%' width="100%" style={{ maxHeight: '200px', maxWidth: '200px' }} />}</label>
                        </div>
                      </Form.Item>
                      <Form.Item name="gasfree" valuePropName="checked" >
                        <Checkbox value={true}><Tooltip title='支付gas fee的使用者將會多拿到一顆的民主精神代幣'>免Gas Fee鑄造</Tooltip></Checkbox>
                        <br />
                        <span style={{ fontStyle: 'underline', color: '#69c0ff', padding: '5px', borderRadius: '8px', fontWeight: 500, fontSize: '12px' }}>GAS餘額: {parseFloat(feePayerBalance).toFixed(2)} MATIC</span>
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
                      // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                      subTitle={<div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                        <Text>Token ID: #{tokenId?.toString()}</Text>
                        <Text>Transaction: <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noreferrer"> {getEllipsisTxt(`https://mumbai.polygonscan.com/tx/${transactionHash}`)}</a></Text>
                        <Text>IPFS URL: <a href={`https://ipfs.io/ipfs/${metadataCID}`} target="_blank" rel="noreferrer"> {getEllipsisTxt(`https://ipfs.io/ipfs/${metadataCID}`)}</a></Text></div>}
                      extra={[
                        <FacebookShareButton
                          url={"https://codesandbox.io/s/rrlli?file=/src/App.js:253-557"}
                          quote={`我已成功鑄造公投NFT(Referendum NFT) #${tokenId?.toString()}`}
                          hashtag={"#VoteForNFT"}
                        >
                          <FacebookFilled style={{ color: '#4267B2' }} /> 分享到Facebook
                        </FacebookShareButton>,
                        <TwitterShareButton
                          url={"https://codesandbox.io/s/rrlli?file=/src/App.js:253-557"}
                          title={`我已成功鑄造公投NFT(Referendum NFT) #${tokenId?.toString()}`}
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
          <Text>Powered by © <a href='https://nft-press.io/' target="_blank" rel="noreferrer">RebirthLab</a></Text>
        </div>
      </Footer>
    </Layout >
  );
}

export default App;
