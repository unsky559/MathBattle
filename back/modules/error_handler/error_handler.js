class ErrorHandler extends Error
{
  constructor(e_status, message){
    super(message);
    this.e_status = e_status;
  }

  sendError(res){
    res.status(this.e_status).json({
      //success: false,
      msg: this.message
    });
  }
}

module.exports = ErrorHandler;