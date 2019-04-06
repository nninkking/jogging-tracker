class RecordsController < ApplicationController
  before_action :set_record, only: [ :edit, :update, :destroy]

  # GET /records
  # GET /records.json
  def index
    records = policy_scope(Record)
    render json: { records: records }
  end

  # POST /records
  # POST /records.json
  def create
    @record = Record.new(user_id: @current_user.id)
    record_params = permitted_attributes(@record)
    @record.attributes = record_params
    authorize(@record)
    if @record.save
      records = policy_scope(Record)
      render json: { records: records}
    else
      format.json { render json: @record.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /records/1
  # PATCH/PUT /records/1.json
  def update
    authorize(@record)
    record_params = permitted_attributes(@record)
    if @record.update(record_params)
      records = policy_scope(Record)
      render json: { records: records}
    else
      format.json { render json: @record.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /records/1
  # DELETE /records/1.json
  def destroy
    authorize(@record)
    @record.destroy
    records = policy_scope(Record)
    if records
        render json: { records: records}
    else
      format.json { render json: @record.errors, status: :unprocessable_entity }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_record
      @record = Record.find(params[:id])
    end
end
