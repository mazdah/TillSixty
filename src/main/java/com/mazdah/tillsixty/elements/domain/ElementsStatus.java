package com.mazdah.tillsixty.elements.domain;

public class ElementsStatus {

	private int seq;
	private String statusName;
	private String updateDate;
	
	public ElementsStatus() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ElementsStatus(int seq, String statusName, String updateDate) {
		super();
		this.seq = seq;
		this.statusName = statusName;
		this.updateDate = updateDate;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getStatusName() {
		return statusName;
	}

	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + seq;
		result = prime * result
				+ ((statusName == null) ? 0 : statusName.hashCode());
		result = prime * result
				+ ((updateDate == null) ? 0 : updateDate.hashCode());
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
		ElementsStatus other = (ElementsStatus) obj;
		if (seq != other.seq)
			return false;
		if (statusName == null) {
			if (other.statusName != null)
				return false;
		} else if (!statusName.equals(other.statusName))
			return false;
		if (updateDate == null) {
			if (other.updateDate != null)
				return false;
		} else if (!updateDate.equals(other.updateDate))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "ElementsStatus [seq=" + seq + ", statusName=" + statusName
				+ ", updateDate=" + updateDate + "]";
	}
	
	
}
