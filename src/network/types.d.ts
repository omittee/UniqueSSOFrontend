declare namespace API {
  type Response<M, T> = {
    message?: M;
    data?: T;
  };

  type ResponseError<C, M, T> = {
    errcode: C,
    errmsg: M,
    data: T
  };

  namespace Login {
    interface SMS {
      phone: string;
    }
    interface LoginRequest {
      email?: string;
      phone?: string;
      password?: string;
      validate_code?: string;
      totp_token?: string;
    }
  }
  
}