import * as crypto from "crypto";

/**
 * Verifies the signature of a message using a public key.
 *
 * @param message - The original message.
 * @param signature - The signature to verify.
 * @param publicKey - The public key used to verify the signature.
 * @returns A promise that resolves to a boolean indicating the validity of the signature.
 */
export async function verifySignature(
  message: string,
  signature: string,
  publicKey: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      // Create a verifier object
      const verifier = crypto.createVerify("SHA256"); // Use the same hash algorithm that was used for signing

      // Add the message to the verifier
      verifier.update(message);

      // Verify the signature
      const isVerified = verifier.verify(publicKey, signature, "base64"); // Adjust 'base64' if needed
      resolve(isVerified);
    } catch (error: any) {
      reject(new Error(`Verification failed: ${error.message}`));
    }
  });
}


