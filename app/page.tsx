'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import error from "next/error";
import React from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Eraser } from "lucide-react";
export default function Home() {
  const [file,setFile] = React.useState<File | undefined | ''>();
  const [question,setQuestion] = React.useState('');
  const [response,setResponse] = React.useState('');
  async function handleChange(){
    if(!file || file.size > 1097152){
      return;
    }
    try{
      const data = new FormData();
      data.set('file',file);
      const res = await fetch('/api/upload',{
        method: 'POST',
        body: data
      })
      const data1 = (await fetch(`http://localhost:3000/api/generate?prompt=${question}`)).text();
      // console.log('in call',data1.text);
      setResponse(await data1);
    }catch(e: any){
      console.log(error);
    }
  }

  function NameChangeHandler(event: { target: { value: React.SetStateAction<string>; }; }){
    setQuestion(event.target.value);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#E32636]">
      <div className="grid w-full max-w-sm items-center gap-6">
      <h1 className="text-3xl text-center">Welcome, upload your CSV file and your prompt to analyze it.</h1>
      <Label htmlFor="picture" className="text-2xl text-center">Upload the CSV file</Label>
      <Input id="picture" type="file" accept=".xlsx, .xls, .csv" required onChange={(e)=> setFile(e.target.files?.[0])} />
      <Textarea placeholder="Enter your prompt here" className="w-[500px] h-[80px]" value={question} onChange={NameChangeHandler} required></Textarea>
      <Button type="submit" onClick={handleChange}>Submit</Button>
        <>
        {response!='' ? <><p className="mt-10 bg-white p-3 rounded-md">{response}</p><div className="flex flex-row gap-5"><button onClick={() => navigator.clipboard.writeText(response)}><ContentCopyIcon></ContentCopyIcon></button><button onClick={()=> {
          setResponse('');
          setQuestion('');
        }}><Eraser /></button></div></>: <></>}
        </>
    </div>
    </main>
  );
}
