package com.mazdah.tillsixty.account.domain;

public class Profile {
	private String email;
	private String facebook;
	private String twitter;
	private String link;
	private String imgPath;
	private String introduction;
	
	public Profile() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Profile(String email, String facebook, String twitter, String link,
			String imgPath, String introduction) {
		super();
		this.email = email;
		this.facebook = facebook;
		this.twitter = twitter;
		this.link = link;
		this.imgPath = imgPath;
		this.introduction = introduction;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFacebook() {
		return facebook;
	}

	public void setFacebook(String facebook) {
		this.facebook = facebook;
	}

	public String getTwitter() {
		return twitter;
	}

	public void setTwitter(String twitter) {
		this.twitter = twitter;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getImgPath() {
		return imgPath;
	}

	public void setImgPath(String imgPath) {
		this.imgPath = imgPath;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result
				+ ((facebook == null) ? 0 : facebook.hashCode());
		result = prime * result + ((imgPath == null) ? 0 : imgPath.hashCode());
		result = prime * result
				+ ((introduction == null) ? 0 : introduction.hashCode());
		result = prime * result + ((link == null) ? 0 : link.hashCode());
		result = prime * result + ((twitter == null) ? 0 : twitter.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Profile other = (Profile) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (facebook == null) {
			if (other.facebook != null)
				return false;
		} else if (!facebook.equals(other.facebook))
			return false;
		if (imgPath == null) {
			if (other.imgPath != null)
				return false;
		} else if (!imgPath.equals(other.imgPath))
			return false;
		if (introduction == null) {
			if (other.introduction != null)
				return false;
		} else if (!introduction.equals(other.introduction))
			return false;
		if (link == null) {
			if (other.link != null)
				return false;
		} else if (!link.equals(other.link))
			return false;
		if (twitter == null) {
			if (other.twitter != null)
				return false;
		} else if (!twitter.equals(other.twitter))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Profile [email=" + email + ", facebook=" + facebook
				+ ", twitter=" + twitter + ", link=" + link + ", imgPath="
				+ imgPath + ", introduction=" + introduction + "]";
	}
	
	
}
