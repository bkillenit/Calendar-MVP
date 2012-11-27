require "spec_helper"

describe Notifier do
  describe "meeting_requested" do
    let(:mail) { Notifier.meeting_requested }

    it "renders the headers" do
      mail.subject.should eq("Meeting requested")
      mail.to.should eq(["to@example.org"])
      mail.from.should eq(["from@example.com"])
    end

    it "renders the body" do
      mail.body.encoded.should match("Hi")
    end
  end

end
