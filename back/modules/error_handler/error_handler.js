const {StatusCodes} = require('http-status-codes');

class FailHandler extends Error
{
  constructor(err_status, data){
    super();
    this.err_status = err_status;
    
    this.packet = {status: "fail", code: err_status, data: data};
  }
}

class InternalErrorHandler extends Error
{
  constructor(err_status = StatusCodes.INTERNAL_SERVER_ERROR, message = "Internal server error."){
    super(message);
    this.err_status = err_status;
  }
}

function convertValidationResult(validation_result){
  if(!validation_result.isEmpty()){
    const err_array = validation_result.array();
    const data = [];    

    for(let err of err_array){
      data.push({param: err.param, message: err.msg});
    }
    return {status: "fail", code: StatusCodes.BAD_REQUEST, data: data};
  }
}

function sendError(response, err){
  if(err instanceof FailHandler){
    response.status(err.err_status).json(err.packet);
  }
  else if(err instanceof InternalErrorHandler){
    const json_err = {status: "error", code: err.err_status, message: err.message};
    response.status(err.err_status).json(json_err);
  }
  else{
    console.log(err);
    const json_err = {status: "error", code: StatusCodes.INTERNAL_SERVER_ERROR, message: "Internal server error."};
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json(json_err);
  }
};

module.exports = {InternalErrorHandler, sendError, convertValidationResult, FailHandler};