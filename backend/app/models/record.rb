class Record < ApplicationRecord
	belongs_to :user
	validates :distance, numericality: { only_integer: true }
	validates :time, numericality: { only_integer: true }
	validates :user_id, numericality: { only_integer: true }
  	# validates_presense_of :date

  	# def self.to_csv
  	# 	attributes = 
end
