FactoryGirl.define do
  factory :user do
    sequence(:username) { |n| "user#{n}" }
    password "foobar"
    email { "#{username}@example.com" }
    role "user"

    # this nested factory has all the characteristics of its parent but changed
    # the users' role, making it an admin factory
    factory :admin do
      role "admin"
    end
  end
end
