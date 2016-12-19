package com.mazdah.tillsixty.elements.domain;

public class SnsAccount {
	
	private String id;
	private String snsName;
	private String snsId;
	private String elementId;
	
	public SnsAccount() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SnsAccount(String id, String snsName, String snsId, String elementId) {
		super();
		this.id = id;
		this.snsName = snsName;
		this.snsId = snsId;
		this.elementId = elementId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSnsName() {
		return snsName;
	}

	public void setSnsName(String snsName) {
		this.snsName = snsName;
	}

	public String getSnsId() {
		return snsId;
	}

	public void setSnsId(String snsId) {
		this.snsId = snsId;
	}

	public String getElementId() {
		return elementId;
	}

	public void setElementId(String elementId) {
		this.elementId = elementId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((elementId == null) ? 0 : elementId.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((snsId == null) ? 0 : snsId.hashCode());
		result = prime * result + ((snsName == null) ? 0 : snsName.hashCode());
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
		SnsAccount other = (SnsAccount) obj;
		if (elementId == null) {
			if (other.elementId != null)
				return false;
		} else if (!elementId.equals(other.elementId))
			return false;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (snsId == null) {
			if (other.snsId != null)
				return false;
		} else if (!snsId.equals(other.snsId))
			return false;
		if (snsName == null) {
			if (other.snsName != null)
				return false;
		} else if (!snsName.equals(other.snsName))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "SnsAccount [id=" + id + ", snsName=" + snsName + ", snsId="
				+ snsId + ", elementId=" + elementId + "]";
	}
	
	
}
