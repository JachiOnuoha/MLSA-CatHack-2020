import React from 'react';
import './App.css';
import { PrimaryButton} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// Just a comment
const App: React.FC = () => {
  const apiKey = 'API KEY';
  const endpoint = 'ENDPOINT';
  const params = "includeTextDetails=true";
  const [url, setUrl] = React.useState('');
  // const[payload, setPayload] = React.useState<any[]>();

  const ImageAPI= (): Promise<void> | void => {
    fetch (`${endpoint}`, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/json',
        },
        // eslint-disable-next-line
        body:JSON.stringify({source: url}),
   }
    ).then(async (response: Response) =>{
        if(response.ok){
            const result = await response.headers; // comeback to this later
            const getUrl = "OPERATION-LOCATION RESPONSE HEADER"
            const attempts = 10;
            let tries = 0;
            const pause = 6;

            while(tries < attempts){
              fetch (`${getUrl}`, {
                method: 'GET',
                headers: {
                  'Ocp-Apim-Subscription-Key': apiKey,
                  'Content-Type': 'application/json',
                }
           }
            ).then(async (response: Response) => {
              if(response.ok){
                const value = await response.json();
                console.log(value);
              }
              else{
                console.log("Error at final stage");
              }
            })
            await(pause);
              tries++;
            }
            // // setPayload(result);
            // console.log(result)
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
