class Profile < ApplicationRecord
  belongs_to :user
  mount_uploader :foto, FotoUploader
end
