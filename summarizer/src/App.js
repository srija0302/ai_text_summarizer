import React, { useState } from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [valueText, setValueText] = useState('');
  const [displaySummary, setDisplaySummary] = useState(null);

  const buttonClicked = async () => {
    try {
      const response = await fetch('http://localhost:3001/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ valueText })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setDisplaySummary(data.summary.content);
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error('Error:', error);
    }
  };

  const getValueText = (e) => {
    setValueText(e.target.value);
  };

  return (
    <Container>
      <h1 className="text-center my-4">AI-Powered Text Summarizer</h1>
      <Form.Group controlId="inputText">
        <Form.Label>Input Text</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={valueText}
          onChange={getValueText}
          placeholder="Enter your text here..."
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={buttonClicked}
      >
        Summarize
      </Button>
      {displaySummary && (
        <>
          <h2 className="text-center my-4">Summary</h2>
          <Row>
            <Col>
              <div className="border rounded p-3 bg-light">{displaySummary}</div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
