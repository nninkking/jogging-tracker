class ApplicationController < ActionController::Base
	include Pundit
	
	skip_before_action :verify_authenticity_token
	before_action :authenticate_request!
	after_action :verify_authorized, except: :index
    after_action :verify_policy_scoped, only: :index

    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

	private

	def user_not_authorized(exception)
	  policy_name = exception.policy.class.to_s.underscore
	  error = t "#{policy_name}.#{exception.query}", scope: "pundit", default: :default
	  render json: {error: error}
	end
	
	protected
	def authenticate_request!
	  if !payload || !JsonWebToken.valid_payload(payload.first)
	    return invalid_authentication
	  end

	  load_current_user!
	  invalid_authentication unless @current_user
	end

	def invalid_authentication
	  render json: {error: 'Invalid Request'}, status: :unauthorized
	end

	private
	def payload
	  auth_header = request.headers['Authorization']
	  token = auth_header.split(' ').last
	  JsonWebToken.decode(token)
	rescue
	  nil
	end

	def load_current_user!
	  @current_user = User.find_by(id: payload[0]['user_id'])
	end

	def current_user
		@current_user
	end
end
