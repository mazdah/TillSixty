package com.mazdah.tillsixty.goal.domain;

public class Media {

	private String id;
	private String mediaType;
	private String mediaFileName;
	private String mediaPath;
	private String elementId;
	
	public Media() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Media(String id, String mediaType, String mediaFileName,
			String mediaPath, String elementId) {
		super();
		this.id = id;
		this.mediaType = mediaType;
		this.mediaFileName = mediaFileName;
		this.mediaPath = mediaPath;
		this.elementId = elementId;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMediaType() {
		return mediaType;
	}

	public void setMediaType(String mediaType) {
		this.mediaType = mediaType;
	}

	public String getMediaFileName() {
		return mediaFileName;
	}

	public void setMediaFileName(String mediaFileName) {
		this.mediaFileName = mediaFileName;
	}

	public String getMediaPath() {
		return mediaPath;
	}

	public void setMediaPath(String mediaPath) {
		this.mediaPath = mediaPath;
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
		result = prime * result
				+ ((mediaFileName == null) ? 0 : mediaFileName.hashCode());
		result = prime * result
				+ ((mediaPath == null) ? 0 : mediaPath.hashCode());
		result = prime * result
				+ ((mediaType == null) ? 0 : mediaType.hashCode());
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
		Media other = (Media) obj;
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
		if (mediaFileName == null) {
			if (other.mediaFileName != null)
				return false;
		} else if (!mediaFileName.equals(other.mediaFileName))
			return false;
		if (mediaPath == null) {
			if (other.mediaPath != null)
				return false;
		} else if (!mediaPath.equals(other.mediaPath))
			return false;
		if (mediaType == null) {
			if (other.mediaType != null)
				return false;
		} else if (!mediaType.equals(other.mediaType))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Media [id=" + id + ", mediaType=" + mediaType
				+ ", mediaFileName=" + mediaFileName + ", mediaPath="
				+ mediaPath + ", elementId=" + elementId + "]";
	}
	
	
}
