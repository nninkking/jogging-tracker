require 'rails_helper'

RSpec.describe UsersController, :type => :controller do
	before(:all) do
  	@admin_user = create(:admin_user)
	end

	context "POST create" do
		it "creates a new user with admin login" do
  			allow(controller).to receive(:payload).and_return([{
          'user_id' => @admin_user.id,
          'exp' => 7.days.from_now.to_i,
          'iss' => 'issuer_name',
          'aud' => 'client'
        }])
    		params = {
    			"firstname" => 'kim', 
    			"lastname" => 'hyonjun',
    			"password" => '123123', 
    			"email" => "hermes@gmail.com",
    			"role" => 'manager' 
    		}
        count = User.all.count
        post :create, :params => { :user => params, :format => :json }
        # users = JSON.parse(response.body)
  			expect(User.all.count).to eq count + 1
	  end
    it "don't allow creates a new user with manager login" do
        @manager_user = create(:manager_user)
        allow(controller).to receive(:payload).and_return([{
          'user_id' => @manager_user.id,
          'exp' => 7.days.from_now.to_i,
          'iss' => 'issuer_name',
          'aud' => 'client'
        }])
        params = {
          "firstname" => 'kim', 
          "lastname" => 'hyonjun',
          "password" => '123123', 
          "email" => "hermes@gmail.com",
          "role" => 'manager' 
        }
        count = User.all.count
        post :create, :params => { :user => params, :format => :json }
        # users = JSON.parse(response.body)
        expect(User.all.count).to eq count
    end
    it "don't allow creates a new user with regular login" do
        @regular_user = create(:regular_user)
        allow(controller).to receive(:payload).and_return([{
          'user_id' => @regular_user.id,
          'exp' => 7.days.from_now.to_i,
          'iss' => 'issuer_name',
          'aud' => 'client'
        }])
        params = {
          "firstname" => 'kim', 
          "lastname" => 'hyonjun',
          "password" => '123123', 
          "email" => "hermes@gmail.com",
          "role" => 'manager' 
        }
        count = User.all.count
        post :create, :params => { :user => params, :format => :json }
        # users = JSON.parse(response.body)
        expect(User.all.count).to eq count
    end
  end

  context "GET index" do
    it "get all user list with admin login" do
      allow(controller).to receive(:payload).and_return([{
        'user_id' => @admin_user.id,
        'exp' => 7.days.from_now.to_i,
        'iss' => 'issuer_name',
        'aud' => 'client'
      }])
      count = User.all.count
      get :index
      users = JSON.parse(response.body)
      expect(users['users'].count).to eq(count)
    end
    it "get all regular user list with manager login" do
      @manager_user = create(:manager_user)
      allow(controller).to receive(:payload).and_return([{
        'user_id' => @manager_user.id,
        'exp' => 7.days.from_now.to_i,
        'iss' => 'issuer_name',
        'aud' => 'client'
      }])
      count = User.where(:role => User.roles[:regaulr]).all.count
      get :index
      users = JSON.parse(response.body)
      expect(users['users'].count).to eq(count)
    end
  end

  context "PUT update" do
    it "update all user role with admin login" do
      @regular_user = create(:regular_user)
      allow(controller).to receive(:payload).and_return([{
        'user_id' => @admin_user.id,
        'exp' => 7.days.from_now.to_i,
        'iss' => 'issuer_name',
        'aud' => 'client'
      }])

      params = {
        "firstname" => 'kim', 
        "lastname" => 'hyonjun',
        "password" => '123123', 
        "email" => "hermes@gmail.com",
        "role" => 'manager' 
      }
      put :update, :params => {:id => @regular_user.id, :user => params, :format => :json }
      @regular_user.reload
      expect(@regular_user.role).to eq 'manager'
    end

    it "don't allow update admin user role with manager login" do
        @manager_user = create(:manager_user)
        allow(controller).to receive(:payload).and_return([{
          'user_id' => @manager_user.id,
          'exp' => 7.days.from_now.to_i,
          'iss' => 'issuer_name',
          'aud' => 'client'
        }])
        params = {
          "firstname" => 'kim', 
          "lastname" => 'hyonjun',
          "password" => '123123', 
          "email" => "hermes@gmail.com",
          "role" => 'regular' 
        }
        put :update, :params => {:id => @admin_user.id, :user => params, :format => :json }
        @admin_user.reload
        expect(@admin_user.role).to eq 'admin'
    end

    it "don't allow update admin user role with regular login" do
        @regular_user = create(:regular_user)
        allow(controller).to receive(:payload).and_return([{
          'user_id' => @regular_user.id,
          'exp' => 7.days.from_now.to_i,
          'iss' => 'issuer_name',
          'aud' => 'client'
        }])
        params = {
          "firstname" => 'kim', 
          "lastname" => 'hyonjun',
          "password" => '123123', 
          "email" => "hermes@gmail.com",
          "role" => 'regular' 
        }
        put :update, :params => {:id => @admin_user.id, :user => params, :format => :json }
        @admin_user.reload
        expect(@admin_user.role).to eq 'admin'
    end
  end

  context "DELETE destory" do

    it "delete all user with admin login" do
      @manager_user = create(:manager_user)
      allow(controller).to receive(:payload).and_return([{
        'user_id' => @admin_user.id,
        'exp' => 7.days.from_now.to_i,
        'iss' => 'issuer_name',
        'aud' => 'client'
      }])
      count = User.all.count
      delete :destroy, :params => { :id => @manager_user.id, :format => :json  }
      expect(count-1).to eq User.all.count
    end

    it "don't allow delete self with admin login" do
      allow(controller).to receive(:payload).and_return([{
        'user_id' => @admin_user.id,
        'exp' => 7.days.from_now.to_i,
        'iss' => 'issuer_name',
        'aud' => 'client'
      }])
      count = User.all.count
      delete :destroy, :params => { :id => @admin_user.id, :format => :json  }
      expect(count).to eq User.all.count
    end

    it "don't delete admin user with manager login" do
      @manager_user = create(:manager_user)
      allow(controller).to receive(:payload).and_return([{
        'user_id' => @manager_user.id,
        'exp' => 7.days.from_now.to_i,
        'iss' => 'issuer_name',
        'aud' => 'client'
      }])
      count = User.all.count
      delete :destroy, :params => { :id => @admin_user.id, :format => :json  }
      expect(count).to eq User.all.count
    end

    it "don't allow delete manager user with regular login" do
      @regular_user = create(:regular_user)
      @manager_user = create(:manager_user)
      allow(controller).to receive(:payload).and_return([{
        'user_id' => @regular_user.id,
        'exp' => 7.days.from_now.to_i,
        'iss' => 'issuer_name',
        'aud' => 'client'
      }])
      count = User.all.count
      delete :destroy, :params => { :id => @manager_user.id, :format => :json  }
      expect(count).to eq User.all.count
    end

  end
end