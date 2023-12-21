"use server";

import { auth, currentUser } from "@clerk/nextjs";

import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/helpers/absolute-url";
import { currency, description, price, title } from "@/constants/stripe";

const stripeRedirect = async () => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      type: "error",
      message: "Unauthorized",
    };
  }

  const settingsUrl = absoluteUrl(`/organization/${orgId}`);

  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: title,
                description: description,
              },
              unit_amount: price,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });

      url = stripeSession.url || "";
    }

    return {
      type: "success",
      message: "Redirected to Stripe successfully.",
      data: url,
    };
  } catch {
    return {
      type: "error",
      message: "Failed to redirect to Stripe.",
    };
  }
};

export { stripeRedirect };
