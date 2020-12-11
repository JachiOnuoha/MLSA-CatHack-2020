import React from 'react';
import './App.css';
import { PrimaryButton} from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';


const App: React.FC = () => {
  // Required information for the API calls
  const apiKey = 'API-KEY';
  const endpoint = 'ENDPOINT';
  const params = "includeTextDetails=true";
  const [url, setUrl] = React.useState('');
  // const[payload, setPayload] = React.useState<any[]>();

  // Use to get the final results
  const getRequest = (source: String|null): Promise<void> | void => {
    const getUrl = source;
  // We use a while loop because the overcome processing time
    fetch (`${getUrl}`, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey,
        'Content-Type': 'application/json',
      }
    }).then(async (response: Response) => {
      if(response.ok){
        const value = await response.json();
        console.log(value);
      }
      else{
        console.log("Error at final stage");
      }
    })
  }

  // This functoin manages all the POST and GET requests to the Business card analysis API
  const ImageAPI= (): Promise<string> | void => {
    // This is the POST request that sends the business card image to the API
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
      // If th request is succesful, then GET request for the results
        if(response.ok){
          // Extract url needed to get the results
            const result = await response.headers.get('Operation-Location');
            console.log(`Here are the results ${result}`);
            console.log(" Processing results. Please wait 10 seconds");
            // Wait 10 seconds before getting the result
            setTimeout(() => { getRequest(result);}, 10000);
             
       }

       // If POST request is unsuccesful, just print out error message
        else{
           console.log("Error for POST request");
       }
    });
  
  };

  // Will update the url to be passed to the API
  const updateUrl = (_: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined): void => {
    if (newValue !== undefined) {
      setUrl(newValue);
    }
       };

  // Displays UI
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
