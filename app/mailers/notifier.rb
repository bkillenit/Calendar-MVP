class Notifier < ActionMailer::Base
  default from: "assistant@checkit.co"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifier.meeting_requested.subject
  #
  def meeting_requested(admin, user, event)
    @admin = User.find_by_id(admin.id)
    @user = User.find_by_id(user)
    @event = event

    if @user.email
      mail to: @user.email
    end
  end
end
