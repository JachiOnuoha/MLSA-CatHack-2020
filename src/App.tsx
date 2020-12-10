import React from 'react';
import './App.css';
import { PrimaryButton} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// Just a comment
const App: React.FC = () => {
  const apiKey = '6278138fbcab4a0592dcc44774ec259f';
  const endpoint = 'https://faceid-workshop.cognitiveservices.azure.com/face/v1.0/detect';
  const params = `returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender`;
  const [url, setUrl] = React.useState('');
  const[payload, setPayload] = React.useState<any[]>();

  const ImageAPI= (): Promise<void> | void => {
    fetch (`${endpoint}?${params}`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({url: url}),
   }
    ).then(async (response: Response) =>{
        if(response.ok){
            const result = await response.json();
            setPayload(result);
            console.log(result)
       }
        else{
           console.log(url);
       }
    });
  
  };

  const updateUrl = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
    if (newValue !== undefined) {
      setUrl(newValue);
    }
       };

  return(
    <div className='App'>
        <title>Image-ine</title>
        <div className='App-content'>
            <h1>Welcome to Image-ine!</h1>
            <p>The world's leading image analysis software developed by a guy named Jachi</p>
          </div>
          <div className='App-content'>
          <form>
          <TextField label="Please enter an image url" styles={{root:{marginTop: '10px'}}} onChange={updateUrl}/>
          </form>
          <PrimaryButton text="Identify" styles={{root:{float: 'right', marginTop: '10px'}}} onClick={ImageAPI}/>

          <div className='ImageContent'>
            <h2>Original Photo</h2>
          <span><img alt='A person or group of people' src={url}/></span>
          </div>

        </div>
        </div>
  );
}

export default App;
