export default function Loading({logo,text}) {
    return (
      <div className="loading text-zinc-400 w-full h-full flex flex-col items-center justify-center">
          
          {logo&&<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mix-blend-multiply">
              <path strokeLinecap="round" style={{animation:"loading 1s infinite linear ",transformOrigin:"center"}} strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>}
          {text&&<span className="text-xl text-green-200 font-bold">Loading...</span>}
      </div>
    )
  }