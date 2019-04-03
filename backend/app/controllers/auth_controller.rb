class AuthController < ApplicationController
	
	skip_before_action :verify_authenticity_token

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
	      render json: user
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