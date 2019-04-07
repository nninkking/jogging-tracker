require 'csv'
class ReportsController < ApplicationController

 before_action :set_record, only: [ :edit, :update, :destroy]

  # GET /records
  # GET /records.json
  def index
    records = policy_scope(Record)
    if !params[:from] && !params[:from]
      records = Record.where(:user_id => @current_user.id)
    else
      records = Record.where("user_id = ? and created_at >= ? and created_at <= ?", @current_user.id, params[:from], params[:to])
    end
    records = records.select("date(created_at) as created_date, sum(distance) as distance,sum(time) as time,(sum(distance) / sum(time)) as average_speed").group("created_date")
    render json:{ reports: records}

  end
  # POST /records
  # POST /records.json
  def create
    skip_authorization
    if !params[:from] && !params[:from]
      records = Record.where(:user_id => @current_user.id)
    else
      records = Record.where("user_id = ? and created_at >= ? and created_at <= ?", @current_user.id, params[:from], params[:to])
    end

    records = records.select("date(created_at) as created_date, sum(distance) as distance,sum(time) as time,(sum(distance) / sum(time)) as average_speed").group("created_date")
    @filename = "report-#{Date.today}.csv"
    attributes = %w{created_date distance time}
    csvfile = CSV.generate(headers: true) do |csv|
      csv << attributes

      records.each do |data|
        csv << attributes.map{ |attr| data.send(attr)}
      end
    end

    render json:{ csvdata: csvfile}
  end
end
