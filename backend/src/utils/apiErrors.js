class ApiError extends Error{
    constructor(
        statusCode,
        message="Something went wrong [default message]",
        errors=[],
        statck=""

    ){
        super(message);
        this.data=null;
        this.statusCode = statusCode;
        this.errors = errors;
        this.stack = stack;
        this.message = message;
        if(statck){
            this.stack = stack;

    }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }}
    export default ApiError;