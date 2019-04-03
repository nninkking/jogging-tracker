class Record < ApplicationRecord
	belongs_to :user
	validates_presense_of :date
end
