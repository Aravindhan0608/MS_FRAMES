export const BUSINESS_INFO = {
  name: 'MS Frames',
  tagline: 'Premium Photo Frames & Customized Gifts in Palani',
  city: 'Palani',
  state: 'Tamil Nadu',
  country: 'India',
  pincode: '624601',
  address: '7/34/L, Jawahar Nagar, Palani, Dindigul, Tamil Nadu - 624601',
  phone: '+91 6369107200',
  phoneDisplay: '+91 63691 07200',
  whatsappNumber: '916369107200',
  email: 'msframes01@gmail.com',
  businessHours: 'Monday – Sunday: 9:00 AM – 8:00 PM',
  mapsUrl: 'https://maps.google.com/?q=MS+FRAMES,+Jawahar+Nagar,+Palani,+Dindigul,+Tamil+Nadu',
  instagramUrl: 'https://www.instagram.com/ms._frames?igsh=YTdwMDg0Y2txdzNx',
  facebookUrl: 'https://www.facebook.com/share/1Po2RkPgXD/',
  siteUrl: 'https://msframes.com',
};

/**
 * Builds a clean, contextual WhatsApp inquiry URL.
 */
export function getWhatsAppInquiryUrl(params = {}) {
  const number = BUSINESS_INFO.whatsappNumber;

  if (!params || !params.type) {
    const text = "Hi MS Frames, I'm interested in ordering a customized frame. Could you share more details?";
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }

  if (params.type === 'product') {
    const text = `Hi MS Frames, I'm interested in the *${params.name || 'Photo Frame'}* (${params.category || 'Frames'}) priced from ₹${params.price || '499'}. Could you share available sizes and customization options?`;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }

  if (params.type === 'custom_order') {
    const lines = [
      '👋 *Hi MS Frames, I would like to place a Custom Frame Order:*',
      '',
      `• *Product Type:* ${params.frameType || 'Classic Photo Frame'}`,
      `• *Size:* ${params.size || '12x18 inches'}`,
      `• *Frame Finish:* ${params.finish || 'Teak Wood'}`,
      `• *Matting / Border:* ${params.matting || 'None'}`,
      `• *Quantity:* ${params.quantity || 1}`,
      `• *Estimated Price:* ₹${params.estimatedPrice || '899'}`,
      params.notes ? `• *Special Notes:* ${params.notes}` : '',
      '',
      'Please let me know how to share my photo for proofing and confirmation! 📸',
    ].filter(Boolean);

    return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
  }

  if (params.type === 'contact') {
    const text = `Hi MS Frames, I have a query regarding your photo framing services. (Sent by: ${params.name || 'Customer'})`;
    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  }

  const defaultText = "Hi MS Frames, I'm interested in your photo framing and customized gift services!";
  return `https://wa.me/${number}?text=${encodeURIComponent(defaultText)}`;
}
