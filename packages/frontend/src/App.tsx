import { ArrowDownOutlined, FacebookFilled, LoadingOutlined, MenuOutlined, PlusOutlined, TwitterSquareFilled } from '@ant-design/icons';
import { useWindowSize } from '@react-hook/window-size';
import { Button, Card, Checkbox, Col, Divider, Drawer, Form, Input, Layout, Result, Row, Spin, Tooltip, Typography } from 'antd';
import "antd/dist/antd.css";
import { BigNumber, ContractReceipt, ethers, Wallet } from 'ethers';
import { create } from 'ipfs-http-client';
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useMediaQuery } from 'react-responsive';
import { FacebookShareButton, TwitterShareButton } from "react-share";
import Account from './components/Account';
import Chains from './components/Chains';
import { REFERENDUM_NFT_ADDRESS } from './constants/address';
import { getEllipsisTxt } from './helpers/formatters';
import { openNotificationWithIcon } from './helpers/notification';
import { useDemocracyToken, useReferendumContract } from './hooks/useContract';
import { useActiveWeb3React } from './hooks/web3';
import metadataTemplate from './metadata-template.json';
import "./style.css";

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
const FEE_PAYER_KEY = process.env.REACT_APP_FEE_PAYER;
const { Header, Content, Footer } = Layout;
const { Text } = Typography
const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: "linear-gradient(270deg, #b5f5ec 10%, #87e8de 50%, #91d5ff 70%,#40a9ff 100% )",
    color: '#ffffff',
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
  const [width, height] = useWindowSize()
  const [mintSuccess, setMintSuccess] = useState(false);
  const { account, chainId } = useActiveWeb3React();
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
  const democracyToken = useDemocracyToken();
  const [tokenSupply, setTokenSupply] = useState<string>("");
  const [nftSupply, setNftSupply] = useState<string>("");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    if (mintSuccess) {
      const timer = setTimeout(() => setMintSuccess(false), 20000);
      return () => clearTimeout(timer);
    }
  }, [mintSuccess])
  useEffect(() => {
    if (!chainId) return;
    if (chainId !== 137) {
      openNotificationWithIcon('info', '?????????Polygon??????', '?????????Menu??????????????????Polygon')
      return;
    }
  }, [chainId])
  useEffect(() => {
    const fetchNftSupply = async () => {
      if (referendumContract) {
        if (FEE_PAYER_KEY) {
          setFeePayer(new Wallet(FEE_PAYER_KEY, referendumContract.provider));
        }
        setNftSupply((await referendumContract.totalSupply()).toString());
        if (account) {
          setBalance((await referendumContract.balanceOf(account)).toNumber());
        }
      }
    }
    fetchNftSupply();
  }, [referendumContract, account]);

  useEffect(() => {
    const fetchFeePayerBalance = async () => {
      if (feePayer) {
        setFeePayerBalance(ethers.utils.formatEther(await feePayer.getBalance()));
      }
    }
    fetchFeePayerBalance();
  }, [feePayer]);

  useEffect(() => {
    const fetchTokenSupply = async () => {
      if (democracyToken)
        setTokenSupply(ethers.utils.formatEther(await democracyToken.totalSupply()));
    }
    fetchTokenSupply();
  }, [democracyToken]);
  const isDesktop = useMediaQuery({
    query: '(min-width: 576px)'
  })
  const isTablet = useMediaQuery({
    query: '(min-width: 992px)'
  })

  const uploadButton = (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {imageStatus === ImageStatus.Uploading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>????????????</div>
    </div>
  );
  const handleUploadChange = async (e: any) => {
    setImageStatus(ImageStatus.Uploading)
    await client.add(e.target.files[0], addImageOptions)
      .then(response => {
        setImageStatus(ImageStatus.Uploaded)
        setPreviewURL(URL.createObjectURL(e.target.files[0]))
        setImageURI(`ipfs://${response.cid.toString()}`)
        console.log(response.cid.toString())
      })

  }
  const handleReceipt = async (receipt: ContractReceipt) => {
    if (receipt.status === 0) {
      openNotificationWithIcon("error", "????????????", "?????????????????????????????????????????????????????????????????????????????????????????????")
      setMintStatus(PageStatus.Error);
      return;
    }
    if (receipt.events && receipt.events[0].args) {
      const tokenId = receipt.events[0].args[2];
      setTransactionHash(receipt.transactionHash);
      setTokenId(tokenId);
      if (tokenId) {
        setTokenId(tokenId);
      }
      setMintStatus(PageStatus.Finished);
      setMintSuccess(true);
      if (referendumContract) {
        setNftSupply((await referendumContract.totalSupply()).toString());
      }
      if (democracyToken) {
        setTokenSupply(ethers.utils.formatEther(await democracyToken.totalSupply()));
      }
    }
  }

  const handleFinish = async (values: any) => {
    if (Date.now() < 1639785600000) {
      openNotificationWithIcon('info', '??????????????????', '??????NFT?????????2021/12/18 08:00AM ????????????')
      return;
    }
    if (Date.now() > 1639929600000) {
      openNotificationWithIcon('info', '??????????????????', '????????????????????????????????????NFT????????????')
      return;
    }
    if (!chainId) {
      openNotificationWithIcon('warning', '??????????????????', '?????????Menu???????????????')
      return;
    }
    if (chainId !== 137) {
      openNotificationWithIcon('info', '?????????Polygon??????', '?????????Menu??????????????????Polygon')
      return;
    }
    if (!account || !referendumContract) {
      return;
    }
    if (!imageURI) {
      openNotificationWithIcon('info', '???????????????', '?????????????????????????????????')
      return;
    }
    let template = metadataTemplate;
    const isGasFree = values.gasfree;

    template.name = values.name;
    template.description = values.description;
    template.image = imageURI;
    setMintStatus(PageStatus.Uploading);

    await client.add(JSON.stringify(template), addImageOptions)
      .then(async (response) => {
        console.log(response.cid.toString())
        setMetadataCID(response.cid.toString());
        try {
          if (isGasFree) {
            if (!feePayer) return;
            const tx = await referendumContract.connect(feePayer).mintTo("ipfs://" + response.cid.toString(), account, { gasPrice: "200000000000" });
            openNotificationWithIcon("success", "?????????????????????", "???????????????Gas Fee??????????????????????????????????????????????????????????????????")
            handleReceipt(await tx.wait());
          }
          else {
            const tx = await referendumContract.mintDemocracySpiritNFT("ipfs://" + response.cid.toString());
            handleReceipt(await tx.wait());
          }
        } catch (err: any) {
          if (err.code === 4001) {
            openNotificationWithIcon("error", "????????????", "?????????????????????")
          }
          else if ((err.data?.code) && (err.data.code === -32000)) {
            openNotificationWithIcon("error", "????????????", "????????????????????????gas fee????????????")
          }
          else if (err.code === -32603) {
            openNotificationWithIcon("error", "????????????", "?????????????????????????????????????????????????????????????????????????????????????????????")
          }
          else if ((err.code === "UNPREDICTABLE_GAS_LIMIT")) {
            openNotificationWithIcon("error", "????????????", "?????????????????????????????????????????????????????????????????????????????????????????????")
          }
          setMintStatus(PageStatus.Error);
        }
      })
  }
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
          title="??????"
          closable={true}
          placement='left'
          onClose={() => { setDrawerOpen(false) }}
          visible={drawerOpen}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <div>
              <Text>??????</Text>
              <Chains />
            </div>
            <div>
              <Text>??????</Text>
              <Account />
            </div>
          </div>
        </Drawer>
      </Header>
      <Content style={{ marginTop: '64px', minHeight: 'calc(100vh - 48px)' }}>
        <Row style={{ minHeight: 'calc(100vh - 48px)' }}>
          <Col span={24} lg={12} >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', minHeight: 'calc(100vh - 64px)', gap: '6px' }}>
              <div>
                <Text style={{ ...styles.title, fontSize: (isDesktop ? "48px" : '32px') }}>????????????????????????</Text><br />
              </div>
              <div>
                <Text style={{ ...styles.subtitle, fontSize: (isDesktop ? "16px" : '12px') }}>#Vote For NFT</Text>
                <Text style={{ ...styles.subtitle, marginLeft: "5px", fontSize: (isDesktop ? "16px" : '12px') }}>#Democracy Token</Text>
                <Text style={{ ...styles.subtitle, marginLeft: "5px", fontSize: (isDesktop ? "16px" : '12px') }}>#iVoted</Text>

              </div>
              <div>
                <span style={{ backgroundColor: "#fff0f6", color: '#ff85c0', padding: '5px', borderRadius: '8px', fontWeight: 500 }}>{`??????NFT?????????: ${nftSupply ? nftSupply : 0}`} </span>
                <span style={{ marginLeft: "16px", backgroundColor: "#e6f7ff", color: '#40a9ff', padding: '5px', borderRadius: '8px', fontWeight: 500 }}>{`?????????????????????: ${tokenSupply ? parseInt(tokenSupply).toFixed(2) : 0}`} </span>

              </div>
              {!isTablet ?
                <div style={{ marginTop: "32px" }}>
                  <div onClick={() => {
                    document?.getElementById("mint")?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}>
                    <ArrowDownOutlined style={{ fontSize: '16px', color: '#bfbfbf' }} />
                  </div>
                </div> : <></>
              }
            </div>
          </Col>
          {!isTablet ? <Divider /> : <></>}

          <Col span={24} lg={12}>
            {mintSuccess ?
              <Confetti
                width={width}
                height={height}
              /> : <></>}
            <div id='mint' style={{ padding: '16px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 48px)' }}>
              <Card
                style={{
                  borderRadius: '16px',
                  padding: '16px',
                  width: '50%',
                  minWidth: '330px',
                  boxShadow: (isTablet ? "0 1px 10px rgb(151 164 175 / 30%)" : ""),
                  border: (!isTablet ? "none" : "")
                }}>
                {balance && mintStatus === PageStatus.Edit ?
                  <div>
                    <Result
                      status="success"
                      title="?????????????????????????????????NFT!"
                      subTitle={<div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                        {chainId ?
                          <Text>???Opeasea??????: <a href={`https://opensea.io/collection/referendum-v2`} target="_blank" rel="noreferrer">{`https://opensea.io/account`}</a></Text> : <></>}
                      </div>}
                      extra={[
                        <FacebookShareButton
                          url={"https://www.referendum-nft.com/"}
                          quote={`????????????????????????NFT(Referendum NFT)`}
                          hashtag={"#iVoted"}
                        >
                          <FacebookFilled style={{ color: '#4267B2' }} /> ?????????Facebook
                        </FacebookShareButton>,
                        <TwitterShareButton
                          url={"https://www.referendum-nft.com/"}
                          title={`????????????????????????NFT(Referendum NFT)`}
                          hashtags={["VoteForNFT", "DemocracyToken", "iVoted"]}>
                          <TwitterSquareFilled style={{ color: '#00acee' }} /> ?????????Twitter
                        </TwitterShareButton>,
                      ]}
                    />
                  </div> :

                  (mintStatus !== PageStatus.Finished ?
                    <Spin spinning={mintStatus === PageStatus.Uploading} tip='?????????...'>
                      <Form
                        form={form}
                        layout="vertical"
                        size={'large'}
                        onFinish={handleFinish}
                      >
                        <Form.Item name='name' label="??????" required tooltip="????????????????????????????????????" rules={[
                          {
                            required: true,
                            message: '???????????????NFT?????????',
                          },
                        ]}>
                          <Input placeholder="??????NFT?????????..." />
                        </Form.Item>
                        <Form.Item name='description' label="????????????" required tooltip="????????????????????????" rules={[
                          {
                            required: true,
                            message: '????????????????????????????????????',
                          },
                        ]}>
                          <Input placeholder="??????NFT?????????..." />
                        </Form.Item>
                        <Form.Item name='image' label="????????????" required tooltip="????????????????????????????????????" rules={[
                          {
                            required: true,
                            message: '?????????????????????',
                          },
                        ]}>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <input type="file" id="actual-btn" hidden onChange={handleUploadChange} />
                            <label htmlFor="actual-btn">{imageStatus !== ImageStatus.Uploaded ? uploadButton : <img src={previewURL} alt='preview' height='100%' width="100%" style={{ maxHeight: '200px', maxWidth: '200px' }} />}</label>
                          </div>
                        </Form.Item>
                        <Form.Item name="gasfree" valuePropName="checked" >
                          <Checkbox value={true}><Tooltip title='??????gas fee??????????????????????????????????????????????????????'>???Gas Fee??????<br />
                            <span style={{ color: '#69c0ff', fontWeight: 500, fontSize: '12px' }}>GAS??????: {feePayerBalance ? parseFloat(feePayerBalance).toFixed(2) : "0"} MATIC</span></Tooltip></Checkbox>
                        </Form.Item>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                          <Button type="primary" htmlType="submit" style={{ borderRadius: '16px', width: '100%' }}>
                            ??????
                          </Button>
                        </div>
                      </Form>
                    </Spin> :
                    <div>
                      <Result
                        status="success"
                        title="?????????????????????????????????NFT!"
                        subTitle={<div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                          <Text>Token ID: #{tokenId?.toString()}</Text>
                          <Text>Transaction: <a href={`https://polygonscan.com/tx/${transactionHash}`} target="_blank" rel="noreferrer"> {getEllipsisTxt(`https://polygonscan.com/tx/${transactionHash}`)}</a></Text>
                          <Text>IPFS URL: <a href={`https://ipfs.io/ipfs/${metadataCID}`} target="_blank" rel="noreferrer"> {getEllipsisTxt(`https://ipfs.io/ipfs/${metadataCID}`)}</a></Text>
                          <Text>Opeasea: <a href={`https://opensea.io/collection/referendum-v2`} target="_blank" rel="noreferrer">{getEllipsisTxt(`https://opensea.io/collection/referendum-v2`)}</a></Text>
                        </div>}
                        extra={[
                          <FacebookShareButton
                            url={"https://www.referendum-nft.com/"}
                            quote={`????????????????????????NFT(Referendum NFT) #${tokenId?.toString()}`}
                            hashtag={"#iVoted"}
                          >
                            <FacebookFilled style={{ color: '#4267B2' }} /> ?????????Facebook
                          </FacebookShareButton>,
                          <TwitterShareButton
                            url={"https://www.referendum-nft.com/"}
                            title={`????????????????????????NFT(Referendum NFT) #${tokenId?.toString()}`}
                            hashtags={["VoteForNFT", "DemocracyToken", "iVoted"]}>
                            <TwitterSquareFilled style={{ color: '#00acee' }} /> ?????????Twitter
                          </TwitterShareButton>,
                        ]}
                      />
                    </div>
                  )
                }
              </Card>
            </div >
          </Col >
        </Row >

      </Content >
      <Footer>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Opensea: <a href='"https://opensea.io/collection/referendum-v2"' target="_blank" rel="noreferrer">{getEllipsisTxt("https://opensea.io/collection/referendum-v2")}</a>
          </div>
          {
            chainId ?
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Donation:  <a href={`https://polygonscan.com/address/0x9eE18F9745f60e1d2036486691fCA5F5f64b7Dda`} target="_blank" rel="noreferrer">{getEllipsisTxt(REFERENDUM_NFT_ADDRESS[chainId])}</a></div>
              :
              <></>
          }
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Powered by ?? <a href='https://nft-press.io/' target="_blank" rel="noreferrer">RebirthLab</a></Text>
          </div>
        </div>
      </Footer>
    </Layout >
  );
}

export default App;
