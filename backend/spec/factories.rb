require 'faker'
FactoryBot.define do

  factory :admin_user, class: User do
    firstname { "Joe"} 
    lastname { "smith" }
    email { Faker::Internet.email }
    password { "blah123" }
    role { "admin" }
  end

  factory :regular_user, class: User do
    firstname { "Joe"} 
    lastname { "smith" }
    email { Faker::Internet.email }
    password { "blah123" }
    role { "regular" }
  end

  factory :manager_user, class: User do
    firstname { "Joe"} 
    lastname { "smith" }
    email { Faker::Internet.email }
    password { "blah123" }
    role { "manager" }
  end
end