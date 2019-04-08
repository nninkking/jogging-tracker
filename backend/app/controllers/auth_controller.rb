class AuthController < ApplicationController

	skip_before_action :authenticate_request!

	def signup
		skip_authorization
	   @user = User.new(user_params)
	   if @user.save
	      render json: @user
	   else
	      render json: @user.errors, status: :unprocessable_entity
	   end 
	end

	def signin
		skip_authorization		
		user = User.find_by_email(params[:email])
	    if user && user.authenticate(params[:password])
	    	auth_token = JsonWebToken.encode({user_id: user.id})
	      	render json: { user: user, token: auth_token}
	    else
	      render json: {}, status: 401
    	end
	end

	def user_params
	   params.require(:user).permit(:firstname, :lastname, :email, :password);
	end
end