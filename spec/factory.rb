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

    factory :user_with_events do
      # check the getting started guide for factory girl
      # for an example of association code like this
      ignore do
        events_count 5
      end
      # add five events to this user with default attributes
      after(:create) do |user, evaluator|
        FactoryGirl.create_list(:event, evaluator.events_count, user: user)
      end
    end
  end

  factory :event do
    title "test event"
    sequence(:starts_at) { |n| Time.now+n.hours }
    # TODO: need to double check that starts_at is accessible so this code works
    ends_at { starts_at+1.hour }
    user
  end
end
