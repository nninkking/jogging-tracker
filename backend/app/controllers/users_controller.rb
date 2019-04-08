class UsersController < ApplicationController
  before_action :set_user, only: [ :edit, :update, :destroy]

  # GET /records
  # GET /records.json
  def index
    users = policy_scope(User)
    render json: { users: users }
  end

  # POST /records
  # POST /records.json
  def create
    @user = User.new()
    user_params = permitted_attributes(@user)
    @user.attributes = user_params
    authorize(@user)
    if @user.save
      users = policy_scope(User)
      render json: { users: users}
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # # PATCH/PUT /records/1
  # # PATCH/PUT /records/1.json
  def update
    authorize(@user)
    user_params = permitted_attributes(@user)
    if @user.update(user_params)
      users = policy_scope(User)
      render json: { users: users}
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # # DELETE /records/1
  # # DELETE /records/1.json
  def destroy
    authorize(@user)
    @user.destroy
    users = policy_scope(User)
    render json: { users: users}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end
end
