
  const form = document.querySelector('form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = {
      first_name: document.querySelector('input[name="first_name"]').value,
      last_name: document.querySelector('input[name="last_name"]').value,
      email: document.querySelector('input[name="email"]').value,
      phone_number: document.querySelector('input[name="phone_number"]').value,
      address: document.querySelector('input[name="address"]').value,
      address_line2: document.querySelector('input[name="address_line2"]').value,
      city: document.querySelector('input[name="city"]').value,
      state: document.querySelector('input[name="state"]').value,
      postal_code: document.querySelector('input[name="postal_code"]').value,
      country: document.querySelector('select[name="country"]').value,
      travel_date: document.querySelector('input[name="travel_date"]').value,
      return_date: document.querySelector('input[name="return_date"]').value,
      departure_city: document.querySelector('input[name="departure_city"]').value,
      destination_city: document.querySelector('input[name="destination_city"]').value,
      budget: document.querySelector('input[name="budget"]').value,
      departure_airport: document.querySelector('select[name="departure_airport"]').value,
      trip_type: document.querySelector('input[name="trip_type"]:checked')?.value,
      services_needed: document.querySelectorAll('input[name="services_needed"]:checked')?.map((checkbox) => checkbox.value),
      retainer_fee: document.querySelector('input[name="retainer_fee"]:checked') ? 100 : 0,
      card_number: document.querySelector('input[name="card_number"]').value,
      card_holder_name: document.querySelector('input[name="card_holder_name"]').value,
    };

    const response = await fetch('http://localhost:4040/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Booking submitted successfully! Your booking ID is ${data.bookingId}`);
    } else {
      alert('Error submitting booking');
    }
  });
