import Conf from "conf";
import chalk from "chalk";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

const conf = new Conf({ projectName: 'solana-cli-wallet', projectVersion: '1.0.0' });

export const keygen = () => {
    const keypair = Keypair.generate();
    conf.set(keypair.publicKey.toString(), Array.from(keypair.secretKey));

    console.log(keypair.publicKey.toString());
}

export const list = () => {
    const addresses = conf.store;

    console.log(Object.keys(addresses));
}

export const balance = async (address: string) => {
    let publicKey: PublicKey;

    try {
        publicKey = new PublicKey(address);
    } catch (error) {
        console.log(chalk.red('Invalid public key. Try again'));
        return;
    }

    const balance = await connection.getBalance(publicKey);
    const balanceInSol = balance / LAMPORTS_PER_SOL;
    console.log("Balance: ", chalk.green(balanceInSol.toString() + ' SOL'));
}

export const airdrop = async (address: string, amount: number) => {
    let publicKey: PublicKey;

    try {
        publicKey = new PublicKey(address);
    } catch (error) {
        console.log(chalk.red('Invalid public key. Try again'));
        return;
    }

    try {
        const tx = await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);

        const confirmed = await connection.confirmTransaction(tx);
        if (confirmed.value.err) {
            console.log(chalk.red('An error occured while processing the transaction. Check the transaction on an explorer.'));
        }
        console.log("Transation hash: ", tx);
    } catch (error) {
        console.log(chalk.red('Error while requesting airdrop: ', error));
    }
}

export const transfer = async (senderAddress: string, receiverAddress: string, amount: number) => {
    const secretKey = conf.get(senderAddress) as number[] | undefined;

    if (!secretKey) {
        console.log(chalk.red('Invalid sender public key. Try again'));
        return;
    }

    const parsedSecretKey = new Uint8Array(secretKey);
    const senderKeypair = Keypair.fromSecretKey(parsedSecretKey);

    let receiverPublicKey: PublicKey;

    try {
        receiverPublicKey = new PublicKey(receiverAddress);
    } catch (error) {
        console.log(chalk.red('Invalid receiver public key. Try again'));
        return;
    }
    try {
        const transer = new Transaction().add(SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: receiverPublicKey,
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        transer.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transer.feePayer = senderKeypair.publicKey;

        transer.partialSign(senderKeypair);
        const serializedTransaction = transer.serialize();
        const signature = await connection.sendRawTransaction(serializedTransaction);
        console.log(chalk.green('Transaction hash: ', signature));
    } catch (error) {
        console.log(chalk.red('An error occurred while processing the transaction: ', error));
    }
}

export const clear = () => {
    conf.clear();
}