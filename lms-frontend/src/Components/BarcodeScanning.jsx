import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const BarcodeScanning = () => {
  return (
    <Container fluid className='padding-top'>
        <Row>
            <Col lg={12}>
                <div className='bc-head'>
                    <h1>OCR & Barcode Scanning
                    </h1>
                    <p>OCR (Optical Character Recognition) and Barcode Scanning are technologies used to extract and process information from text and barcodes. Here are three key points about them</p>
                </div>
            </Col>
        </Row>
        <Row>
            <Col md={12} lg={6}>
                <div className='barcode-details-main-div'>
                    <div className='bc-img-div'>
                    <img src="/Images/barcode.jpg" alt="" />
                    </div>
                </div>
            </Col>
            <Col md={12} lg={6}>
                <div className='barcode-details'>
                    <div className='barcode-sub-div barcode-sub-div-one'>
                    <img src="/Images/extraction.jpg" alt="" />
                        <div className='details-bc-div'>
                            <h6>
                            Data Extraction & Automation
                            </h6>
                            <p>Barcode scanning quickly retrieves product or inventory details by reading barcodes or QR codes.</p>
                        </div>
                    </div>
                    <div className='barcode-sub-div barcode-sub-div-two'>
                    <img src="/Images/wide.jpeg" alt="" />
                        <div className='details-bc-div'>
                            <h6>
                            Wide Industry Applications
                            </h6>
                            <p>Used in retail (product scanning), logistics (tracking shipments), healthcare (patient records), and banking (check processing).</p>
                        </div>
                    </div>
                    <div className='barcode-sub-div barcode-sub-div-three'>
                    <img src="/Images/improve.jpg" alt="" />
                        <div className='details-bc-div'>
                            <h6>
                            Improved Efficiency & Accuracy
                            </h6>
                            <p>Reduces manual data entry errors and speeds up processes by automating text recognition and product identification.</p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default BarcodeScanning