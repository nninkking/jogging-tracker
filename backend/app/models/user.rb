
class User < ApplicationRecord
	has_many :records
	attr_accessor :password
	enum roles: [ :user, :manager , :admin]
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
	
	validates :firstname, :presence => true, :uniqueness => false, :length => { :in => 1..20 }
	validates :email, :presence => true, :uniqueness => true, :format => VALID_EMAIL_REGEX
	validates :lastname, :presence => true, :uniqueness => false, :length => { :in => 1..20 }
	validates_length_of :password, :in => 4..20, :on => :create

	before_save do
	
		encrypt_password
	end

	def authenticate(password)
		password_hash == BCrypt::Engine.hash_secret(password, password_salt)
	end

	private

	def encrypt_password
		self.password_salt = BCrypt::Engine.generate_salt
    	self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
	end
	def set_default
     	self.role = roles[:user]
   	end
end
