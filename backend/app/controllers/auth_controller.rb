class AuthController < ApplicationController
	skip_before_action :verify_authenticity_token, :authenticate_request!
	
	def signup
	   @user = User.new(user_params)
	   
	   if @user.save
	      render json: @user
	   else
	      render json: {}, status: 401
	   end
	   
	end

	def signin
		user = User.find_by_email(params[:email])
	    if user && user.authenticate(params[:password])
	    	auth_token = JsonWebToken.encode({user_id: user.id})
	    	


	      	render json: { user: user, token: auth_token}
	      # session[:user_id] = user.id
	      # redirect_to root_url, notice: "Logged in!"
	    else
	      render json: {}, status: 401
    	end
	end

	def user_params
	   params.require(:user).permit(:firstname, :lastname, :email, :password);
	end
end