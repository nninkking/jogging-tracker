require 'rails_helper'
require 'faker'
RSpec.describe AuthController, :type => :controller do
	before(:all) do
  		@admin_user = create(:admin_user)
	end

	context "POST signin" do

		it "returns valid token for correct email and password" do
			# create(:user, email: "someone@example.tld", password: "somepassword")
			post :signin, :params => {:email => @admin_user.email, :password => @admin_user.password}
			user = JSON.parse(response.body)
			token = JsonWebToken.decode(user['token'])
			expect(token[0]["user_id"]).to eq @admin_user.id
		end
		it "returns 401 with incorrect email and password" do
			post :signin, :params => {:email => "someone@example.tld", :password => "somepassword"}
			expect(response).to have_http_status(401)
		end
	end

	context "POST signup" do

		it "returns 422 for duplicate email" do
			# create(:user, email: "someone@example.tld", password: "somepassword")
			post :signup, :params => { :user => {
		          "firstname" => 'kim', 
		          "lastname" => 'hyonjun',
		          "password" => '123123', 
		          "email" => @admin_user.email,
		      	}, :format => :json
	        }
			expect(response).to have_http_status(422)
		end
		it "user signup with user role" do
			# create(:user, email: "someone@example.tld", password: "somepassword")
			post :signup, :params => { :user => {
		          "firstname" => 'kim', 
		          "lastname" => 'hyonjun',
		          "password" => '123123', 
		          "email" => Faker::Internet.email,
		          "role" => "admin"
		      	}, :format => :json
	        }
	        user = JSON.parse(response.body)
			expect(user['role']).to eq 'regular'
		end
	end
end