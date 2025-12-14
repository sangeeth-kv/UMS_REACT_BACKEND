import React from "react"

class ErrorBoundary extends React.Component{
    state={hasError:false}

    static getDerivedStateFromError(error){
        console.log("Error in the getDirved function",error)
        return {hasError:true}
    }

    componentDidCatch(error,info){
        console.log(error,info)
    }

    render(){
        if(this.state.hasError){
            return ( <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">
            Something went wrong. Please try again.
          </div>
        </div>)
        }
        return this.props.children
    }
}

export default ErrorBoundary